import { renderHook, waitFor } from '@testing-library/react';
import useActivity from './useActivity';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

describe("Tests useActivity hook", () => {
    it.each(["Start a collection", "Listen to music you haven't heard in a while"])("Should fetch activity text: %s", async (activity) => {
        // Given
        const server = setupServer(
            rest.get('https://www.boredapi.com/api/activity', async (req, res, ctx) => {
                return res(
                   ctx.status(200),
                   ctx.json(
                     {
                        "activity": activity,
                     }
                   )
                );
            })
        );
        server.listen();

        // When
        const { result } = renderHook(() => useActivity());

        // Then
        await waitFor(() => {
           expect(result.current.activity).toBe(activity);
        });
        server.close();
    });
});
