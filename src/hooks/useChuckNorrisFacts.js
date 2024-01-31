import {useState, useEffect} from "react";

export default function useChuckNorrisFacts(activity) {
    const [chuckNorrisFact, setChuckNorrisFact] = useState("");
    const [query, setQuery] = useState();

    const lastWordsOfSentence = (sentence, wordsNumber) => {
        let lastIndexOfSpace = sentence.length;
        for (let wordNumber = 0; wordNumber < wordsNumber; wordNumber++) {
            lastIndexOfSpace = sentence.lastIndexOf(' ', lastIndexOfSpace - 1);
        }
        return sentence.substring(lastIndexOfSpace + 1);
    }

    useEffect(() => {
        if (activity) {
            setQuery(lastWordsOfSentence(activity, 2));
        }
    }, [activity]);
    useEffect(() => {
        if (query) {
            fetch('https://api.chucknorris.io/jokes/search?query=' + query)
                .then((response) => response.json())
                .then((json) => {
                    if (json.result[0]) {
                        setChuckNorrisFact(json.result[0].value);
                    } else {
                        setQuery(lastWordsOfSentence(activity, 1));
                    }
                });
        }
    }, [query]);

    return { chuckNorrisFact };
}