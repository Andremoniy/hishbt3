import { render, screen } from '@testing-library/react';
import App from './App';
import useActivity from './hooks/useActivity';
import useChuckNorrisFacts from './hooks/useChuckNorrisFacts';

jest.mock('./hooks/useActivity');
jest.mock('./hooks/useChuckNorrisFacts');

describe("Tests App component", () => {
    it.each([
            ["Start a collection", "Chuck Norris doesn't need garbage collection because he doesn't call.Dispose(), he calls.DropKick()."],
            ["Listen to music you haven't heard in a while", "Chuck Norris once caught an eighty pound tuna while spearfishing in a mirage."]
            ])("Should show activity text: %s and Chuck Norris's fact: %s", (activity, chuckNorrisFact) => {
        // Given
        useActivity.mockReturnValue({ activity });
        useChuckNorrisFacts.mockReturnValue({ chuckNorrisFact });
        render(<App/>);

        // When
        const activityText = screen.getByText("How about you " + activity + "?");
        const chuckNorrisFactText = screen.getByText("BTW, " + chuckNorrisFact);

        // Then
        expect(activityText).toBeInTheDocument();
        expect(chuckNorrisFactText).toBeInTheDocument();
        expect(useChuckNorrisFacts).toBeCalledWith(activity);
    });
});
