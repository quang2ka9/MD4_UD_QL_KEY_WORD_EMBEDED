import {Schema, model} from "mongoose";

interface IKeyword {
    keyword: string
}

interface IBook {
    title: string;
    description: string;
    author: string;
    keywords: IKeyword[];

}

const keywordsSchema = new Schema<IKeyword>({
    keyword: String
})


const bookSchema = new Schema<IBook>({
    title: String,
    description: String,
    author: String,
    keywords: [keywordsSchema],
})

const Book = model<IBook>('Book', bookSchema);


export { Book };
