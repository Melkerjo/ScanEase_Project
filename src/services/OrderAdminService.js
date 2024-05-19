

const fetchData = async () => {
    try {
        const response = await fetch(`https://localhost:7294/api/Order`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Något gick fel vid hämtandet av ordrar.');
        }
    } catch (error) {
        throw new Error('Något gick fel:', error);
    }
};

export default fetchData;
