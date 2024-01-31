import {useState, useEffect} from "react";

export default function useActivity() {
    const [activity, setActivity] = useState();
    useEffect(() => {
        fetch('https://www.boredapi.com/api/activity')
            .then((response) => response.json())
            .then((json) => setActivity(json.activity));
    }, []);
    return { activity };
}