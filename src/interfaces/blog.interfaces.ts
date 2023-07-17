export interface Blog {
    name: string,
    email: string,
    allowComments: boolean,
    topic: "Fashion" | "Tech" | "Trends" | "General" | "Politic",
    description: string,
}