const base = "https://localhost:7248";

export const loadCustomer = async (id) => {
    const url = base + `/customers/${id}`;
    const response = await fetch(url, {
        "location": "same-origin"
    });

    return await response.json();
};

export const loadProjectsForCustomer = async(id) => {
    const url = base + `/customers/${id}/projects`;
    const response = await fetch(url, {
        "location": "same-origin"
    });

    return await response.json();
}

export const loadAllCustomers = async () => {
    const url = base + "/customers";

    const response = await fetch(url, {
        "location": "same-origin"
    });
    return await response.json();
};

export const loadTimeRegisters = async () => {
    const url = base + "/timereg";

    const response = await fetch(url, {
        "location": "same-origin"
    });

    return await response.json();
};