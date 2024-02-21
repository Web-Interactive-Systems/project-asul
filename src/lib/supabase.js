import { getAuthUser } from '@/actions';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_KEY,
  {
    auth: {
      flowType: 'pkce',
    },
  }
);

const POSTGRES_CHANNEL = supabase.channel('schema-db-changes');
const subscribers = {};
/**
 * Represents a channel for subscribing to PostgreSQL database changes using Supabase.
 */
class PostgresChannel {
  /**
   * Create a new PostgresChannel instance.
   * @param {string} name - The name of the database table to subscribe to changes.
   */
  constructor(name) {
    this.name = name; // The name of the database table.
    this.channel = POSTGRES_CHANNEL; // The Supabase channel for database changes.
  }

  /**
   * Subscribe to events on this channel.
   * @param {string} event - The event name to subscribe to (e.g., 'INSERT', 'UPDATE', 'DELETE', '*').
   * @param {function} callback - The callback function to execute when an event occurs.
   * @returns {{unsubscribe: function}}
   */
  on(event, callback) {
    if (!subscribers.hasOwnProperty('schema-db-changes')) {
      subscribers['schema-db-changes'] = [];
    }

    subscribers['schema-db-changes'].push({
      table: this.name,
      event,
      callback,
    });

    return {
      unsubscribe: () => {
        this.off(event, callback);
      },
    };
  }

  /**
   * Unsubscribe from events on this channel.
   * @param {string} event - The event name to unsubscribe from (e.g., 'INSERT', 'UPDATE', 'DELETE', '*').
   * @param {function} callback - The callback function to unsubscribe.
   * @returns {boolean} True if the callback was found and unsubscribed; otherwise, false.
   */
  off(event, callback) {
    if (subscribers.hasOwnProperty('schema-db-changes')) {
      const listener = subscribers['schema-db-changes'].find((subscriber) => {
        return (
          subscriber.table === this.name &&
          subscriber.event === event &&
          subscriber.callback === callback
        );
      });

      if (listener) {
        subscribers['schema-db-changes'].splice(
          subscribers['schema-db-changes'].indexOf(listener),
          1
        );

        return true;
      }

      return false;
    }
  }
}

/**
 * Represents a broadcast channel for sending and receiving real-time messages using Supabase.
 */
class BroadcastChannel {
  /**
   * Create a new BroadcastChannel instance.
   * @param {string} name - The name of the broadcast channel.
   */
  constructor(name) {
    this.name = name; // The name of the broadcast channel.
    this.channel = supabase.channel(name); // The Supabase channel for broadcasting messages.
  }

  /**
   * Subscribe to events on this broadcast channel.
   * @param {string} event - The event name to subscribe to (e.g., 'message', 'notification').
   * @param {function} callback - The callback function to execute when an event is received.
   * @param {boolean} once - True if the callback should only be executed once; otherwise, false.
   * @returns {void}
   */
  on(event, callback, once = false) {
    if (!subscribers.hasOwnProperty(this.name)) {
      subscribers[this.name] = [];
    }

    subscribers[this.name].push({
      event,
      callback,
      once
    });
  }

  /**
   * Unsubscribe from events on this channel.
   * @param {string} event - The event name to unsubscribe from (e.g., 'message', 'notification').
   * @param {function} callback - The callback function to unsubscribe.
   * @returns {boolean} True if the callback was found and unsubscribed; otherwise, false.
   */
  off(event, callback) {
    if (subscribers.hasOwnProperty(this.name)) {
      const listener = subscribers[this.name].find((subscriber) => {
        return subscriber.event === event && subscriber.callback === callback;
      });

      if (listener) {
        subscribers[this.name].splice(subscribers[this.name].indexOf(listener), 1);

        return true;
      }

      return false;
    }
  }

  /**
   * Send a message through the broadcast channel.
   * @param {string} event - The event name for the message (e.g., 'message', 'notification').
   * @param {string|string[]} recipientId - The ID of the recipient user(s) to send the message to (or '*' for all users).
   * @param {any} data - The data payload to send with the message.
   * @returns {Promise} A Promise that resolves when the message is sent.
   */
  async send(event, recipientId, data = null) {
    const authUser = await getAuthUser();

    if (!authUser) {
      return Promise.reject(new Error('User needs to be authenticated to send a message'));
    }

    return this.channel.send({
      type: 'broadcast',
      event,
      payload: { senderId: authUser.id, recipientId, data },
    });
  }
}

/* Ajout de nouveaux channels ici : */

export const broadcast = {
  notifications: new BroadcastChannel('notifications'),
};

export const postgres = {
  // new PostgresChannel('Nom de la table')
  test: new PostgresChannel('Test'),
  match: new PostgresChannel('Match'),
  session: new PostgresChannel('Session'),
  player: new PostgresChannel('Player'),
};

/* ------------------------------ */

POSTGRES_CHANNEL.on(
  'postgres_changes',
  {
    event: '*',
    schema: 'public',
  },
  (data) => {
    subscribers['schema-db-changes']?.forEach((subscriber) => {
      getAuthUser()
        .then((authUser) => {
          if (
            authUser &&
            subscriber.table === data.table &&
            (subscriber.event === '*' || subscriber.event === data.eventType)
          ) {
            subscriber.callback(data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }
).subscribe((status, err) => {
  if (err) console.error(err);
  console.log(`PostgreSQL channel status: ${status}`, err);
});

for (const chname in broadcast) {
  broadcast[chname].channel
    .on('broadcast', { event: '*' }, (data) => {
      subscribers[broadcast[chname].name]?.forEach((subscriber) => {
        getAuthUser()
          .then((authUser) => {
            if (
              authUser &&
              (data.payload.recipientId === '*' ||
                data.payload.recipientId === authUser.id ||
                (Array.isArray(data.payload.recipientId) &&
                  data.payload.recipientId.includes(authUser.id))) &&
              (subscriber.event === '*' || subscriber.event === data.event)
            ) {
              subscriber.callback(data);

              if (subscriber.once) {
                broadcast[chname].off(subscriber.event, subscriber.callback);
              }
            }
          })
          .catch((err) => {
            console.error(err);
          });
      });
    })
    .subscribe();
}
