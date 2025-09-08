export type Item = { year: number; text: string };


export type Category = {
id: number;
badge: string;
label: string;
items: Item[];
};