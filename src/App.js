import React, { useEffect, useState, Suspense } from 'react';
import { graphql, usePreloadedQuery, useLazyLoadQuery } from 'react-relay';
import { loadQuery, RelayEnvironmentProvider } from 'react-relay';
import RelayEnv from './relay.js';
import AppGetAllFilmsQuery from './__generated__/AppGetAllFilmsQuery.graphql';

function ShowFilms(props) {
    const data = usePreloadedQuery(
        graphql`
            query AppGetAllFilmsQuery {
                allFilms {
                    films {
                        id
                        title
                    }
                }
            }
        `,
        props.initialQueryRef,
    );
    return <pre>{JSON.stringify(data, null, 4)}</pre>;
}

export default function App(props) {
    return (
        <React.StrictMode>
            <Suspense fallback={<span>loading...</span>}>
                <RelayEnvironmentProvider environment={RelayEnv}>
                    <p>All star wars films:</p>
                    <ShowFilms initialQueryRef={props.queryRefs[AppGetAllFilmsQuery.hash]} />
                </RelayEnvironmentProvider>
            </Suspense>
        </React.StrictMode>
    );
}
