const API_URL = "https://fake-coffee-api.vercel.app";

export const fetchProducts = async (param) => {
    try {
        const response = await fetch(`${API_URL}/api`);
        return response.json();
    } catch (error) {
        console.error("Error: ", error);
    }
};

// Laadi konkreetne toode ID järgi
export const fetchProductById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/api/${id}`);
        return response.json();
    } catch (error) {
        console.error("Error: ", error);
    }
}

// Leia kategooria roast level
export const fetchRoastLevels = async () => {
    try {
        const response = await fetch(`${API_URL}/api`);
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Data format is incorrect");
        const roastLevels = data.map(item => item.roast_level).filter(Boolean);
        const uniqueRoastLevels = [...new Set(roastLevels)];
        return uniqueRoastLevels;
    } catch (error) {
        console.error("Error: ", error);
    }
};