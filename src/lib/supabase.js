import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_KEY
);

const POSTGRES_CHANNEL = supabase.channel('schema-db-changes');
const subscribers = {};

class PostgresChannel {
  constructor(name) {
    this.name = name;
    this.channel = POSTGRES_CHANNEL;
  }

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

class BroadcastChannel {
  constructor(name) {
    this.name = name;
    this.channel = supabase.channel(name);
  }

  on(event, callback) {
    if (!subscribers.hasOwnProperty(this.name)) {
      subscribers[this.name] = [];
    }

    subscribers[this.name].push({
      event,
      callback,
    });
  }

  send(event, userId, data) {
    return this.channel.send({
      type: 'broadcast',
      event,
      payload: { userId, data },
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
