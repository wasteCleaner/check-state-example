export type State = {
    category: Category[];
};

export type Category = {
    name: string;
    id: number;
};

export type Reducer<S,A> = (state: S, action: A) => S;
