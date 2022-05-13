import * as ReactDOM from 'react-dom/client';
import App from './App';
import AppGetAllFilmsQuery from './__generated__/AppGetAllFilmsQuery.graphql';
import RelayEnv from './relay.js';
import { loadQuery, RelayEnvironmentProvider } from 'react-relay';

const props = {
    queryRefs: {
        // TODO: some api/tooling to expose + loop through all queries here
        // to ensure we're able to preload _everything_
        [AppGetAllFilmsQuery.hash]: loadQuery(RelayEnv, AppGetAllFilmsQuery, {}),
    },
};

ReactDOM.hydrateRoot(document.getElementById('app'), <App {...props} />);
