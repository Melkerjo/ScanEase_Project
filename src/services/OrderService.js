

const fetchData = async (id) => {
    try {
        const response = await fetch(`https://localhost:7294/api/Order/user/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Något gick fel vid hämtandet av order.');
        }
    } catch (error) {
        throw new Error('Något gick fel:', error);
    }
};

export default fetchData;
