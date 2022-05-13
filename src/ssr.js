import 'regenerator-runtime/runtime.js';
import { Writable } from 'stream';
import { Suspense } from 'react';
import * as ReactDOM from 'react-dom/server';
import { loadQuery, RelayEnvironmentProvider } from 'react-relay';
import App from './App';
import AppGetAllFilmsQuery from './__generated__/AppGetAllFilmsQuery.graphql';
import RelayEnv from './relay.js';

class PromiseFromStream extends Writable {
    constructor() {
        super();
        this._data = '';
        this._promise = new Promise((resolve) => {
            this._resolve = resolve;
        });
    }

    _write(chunk, encoding, callback) {
        console.log('chunk', chunk.toString());
        this._data += chunk.toString();
        callback();
    }

    end() {
        this._resolve(this._data);
        this.destroy();
    }

    then(resolve, reject) {
        return this._promise.then(resolve, reject);
    }
}

export default async function renderComponent() {
    const props = {
        queryRefs: {
            // TODO: some api/tooling to expose + loop through all queries here
            // to ensure we're able to preload _everything_
            [AppGetAllFilmsQuery.hash]: loadQuery(RelayEnv, AppGetAllFilmsQuery, {}),
        },
    };

    const renderStream = new PromiseFromStream();
    const { pipe } = ReactDOM.renderToPipeableStream(
        <Suspense fallback={<p>hi</p>}>
            <App {...props} />
        </Suspense>,
        {
            onAllReady() {
                pipe(renderStream);
            },
        },
    );

    const markup = await renderStream;

    // Grab all the records from the relay store so we can serialize it onto the
    // page and populate the store in the browser before hydrating
    const relayRecords = RelayEnv.getStore().getSource().toJSON();

    return { markup, relayRecords };
}
