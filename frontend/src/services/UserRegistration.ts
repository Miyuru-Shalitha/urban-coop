interface User{
    _id: string;
    name: string;
    email: string;
    mobile: string;
    atendees: string;
}
const getUsers = async () => {
    const users: User[] = [
        {
            _id: "UB12345",
            name: "David",
            email: "David@email.com",
            mobile: "1234567890",   
            atendees: "2",  
        },
        {
            _id: "UB12346",
            name: "Emma",
            email: "Emma@email.com",    
            mobile: "1234567890",
            atendees: "3",
        },

        {
            _id: "UB12347",
            name: "Michael",
            email: "michael@email.com",
            mobile: "1234567890",
            atendees: "4",
        },
    ];
    return users;
};
export {type User, getUsers};