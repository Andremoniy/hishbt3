import { renderHook, waitFor } from '@testing-library/react';
import useChuckNorrisFacts from './useChuckNorrisFacts';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

describe("Tests useChuckNorrisFacts hook", () => {
    it.each([
            ["Study a foreign language", "foreign language", "Chuck Norris can speak in any of 37 foreign languages in a Dyslexic format."],
            ["Start a collection", "collection", "Chuck Norris doesn't need garbage collection because he doesn't call.Dispose(), he calls.DropKick()."],
    ])("Should fetch a fact about Chuck Norris for activity %s and query %s: %s", async (activity, query, chuckNorrisFact) => {
        // Given
        const server = setupServer(
            rest.get('https://api.chucknorris.io/jokes/search', async (req, res, ctx) => {
                const url = new URL(req.url)
                const queryParam = url.searchParams.get('query')
                let total = 0;
                let result = [];
                if (queryParam === query) {
                    total = 1;
                    result = [{
                                "value": chuckNorrisFact
                              }];
                }
                return res(
                   ctx.status(200),
                   ctx.json(
                                {
                                    "total": total,
                                    "result": result
                                }
                   )
                );
            })
        );
        server.listen();

        // When
        const { result } = renderHook(() => useChuckNorrisFacts(activity));

        // Then
        await waitFor(() => {
           expect(result.current.chuckNorrisFact).toBe(chuckNorrisFact);
        });
        server.close();
    });

    it("Should not fetch a fact about Chuck Norris if activity is undefined", async () => {
        // Given

        // When
        const { result } = renderHook(() => useChuckNorrisFacts(undefined));

        // Then
        await waitFor(() => {
           expect(result.current.chuckNorrisFact).toBe("");
        });
    });
});
