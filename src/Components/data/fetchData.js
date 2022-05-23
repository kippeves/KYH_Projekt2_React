

export const loadCustomer = async (id) => {
    const url = `http://api.kippeves.com:3000/customers/${id}?embed=projects`;
    const response = await fetch(url, {
        "location": "same-origin"
    });

    return await response.json();
};

export const loadAllCustomers = async () => {
    const url = "http://api.kippeves.com:3000/customers";

    const response = await fetch(url, {
        "location": "same-origin"
    });
    return await response.json();
};

export const loadTimeRegisters = async () => {
    const url = "http://api.kippeves.com:3000/timeregistrations?expand=customer&expand=project";

    const response = await fetch(url, {
        "location": "same-origin"
    });

    return await response.json();
};