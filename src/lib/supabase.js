import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_KEY
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
   */
  on(event, callback) {
    if (!subscribers.hasOwnProperty(this.name)) {
      subscribers[this.name] = [];
    }

    subscribers[this.name].push({
      event,
      callback,
    });
  }

  /**
   * Send a message through the broadcast channel.
   * @param {string} event - The event name for the message (e.g., 'message', 'notification').
   * @param {string} from - The user ID of the sender.
   * @param {string} to - The user ID of the recipient.
   * @param {any} data - The data payload to send with the message.
   * @returns {Promise} A Promise that resolves when the message is sent.
   */
  send(event, from, to, data) {
    return this.channel.send({
      type: 'broadcast',
      event,
      payload: { sender: from, recipient: to, data },
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
      if (
        subscriber.table === data.table &&
        (subscriber.event === data.eventType || subscriber.event === '*')
      ) {
        subscriber.callback(data);
      }
    });
  }
).subscribe();

for (const chname in broadcast) {
  broadcast[chname].channel
    .on('broadcast', { event: '*' }, (data) => {
      subscribers[broadcast[chname].name]?.forEach((subscriber) => {
        if (subscriber.event === data.event || subscriber.event === '*') {
          subscriber.callback(data);
        }
      });
    })
    .subscribe();
}
