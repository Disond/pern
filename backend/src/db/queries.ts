import { db } from "./index";
import { eq } from "drizzle-orm";
import {
    users,
    comments,
    products,
    type newUser,
    type newComment,
    type newProduct,
} from "./schema";
// asdasd

type UserUpdateInput = Partial<Pick<newUser, "email" | "name" | "imageUrl">>;
type ProductUpdateInput = Partial<
    Pick<newProduct, "title" | "description" | "imageUrl">
>;
type CommentUpdateInput = Partial<Pick<newComment, "content">>;

// USER QUERIES
export const createUser = async (data: newUser) => {
    const [user] = await db.insert(users).values(data).returning();
    return user;
};

export const getUserById = async (id: string) => {
    return db.query.users.findFirst({
        where: eq(users.id, id),
    });
};

export const updateUser = async (id: string, data: UserUpdateInput) => {
    const [user] = await db
        .update(users)
        .set(data)
        .where(eq(users.id, id))
        .returning();

    if (!user) {
        throw new Error(`User with id ${id} not found`);
    }
    return user;
};

// Insert a new user or update an existing one on primary key conflict
export const upsertUser = async (data: newUser) => {
    const [user] = await db
        .insert(users)
        .values(data)
        .onConflictDoUpdate({
            target: users.id,
            set: {
                email: data.email,
                name: data.name,
                imageUrl: data.imageUrl,
                updatedAt: new Date(),
            },
        })
        .returning();
    return user;
};

// PRODUCTS QUERIES
export const createProduct = async (data: newProduct) => {
    const [product] = await db.insert(products).values(data).returning();
    return product;
};

export const getAllProducts = async () => {
    return db.query.products.findMany({
        with: { user: true },
        orderBy: (products, { desc }) => [desc(products.createdAt)],
    });
};

export const getProductById = async (id: string) => {
    return db.query.products.findFirst({
        where: eq(products.id, id),
        with: {
            user: true,
            comments: {
                with: { user: true },
                orderBy: (comments, { desc }) => [desc(comments.createdAt)],
            },
        },
    });
};

export const getProductsByUserId = async (userId: string) => {
    return db.query.products.findMany({
        where: eq(products.userId, userId),
        with: { user: true },
        orderBy: (products, { desc }) => [desc(products.createdAt)],
    });
};

export const updateProduct = async (id: string, data: ProductUpdateInput) => {
    const [product] = await db
        .update(products)
        .set(data)
        .where(eq(products.id, id))
        .returning();

    if (!product) {
        throw new Error(`Product with id ${id} not found`);
    }
    return product;
};

export const deleteProduct = async (id: string) => {
    const [product] = await db
        .delete(products)
        .where(eq(products.id, id))
        .returning();

    if (!product) {
        throw new Error(`Product with id ${id} not found`);
    }
    return product;
};

// COMMENT QUERIES
export const createComment = async (data: newComment) => {
    const [comment] = await db.insert(comments).values(data).returning();
    return comment;
};

export const deleteComment = async (id: string) => {
    const [comment] = await db
        .delete(comments)
        .where(eq(comments.id, id))
        .returning();

    if (!comment) {
        throw new Error(`Comment with id ${id} not found`);
    }
    return comment;
};

export const getCommentById = async (id: string) => {
    return db.query.comments.findFirst({
        where: eq(comments.id, id),
        with: { user: true, product: true },
    });
};

export const updateComment = async (id: string, data: CommentUpdateInput) => {
    const [comment] = await db
        .update(comments)
        .set(data)
        .where(eq(comments.id, id))
        .returning();

    if (!comment) {
        throw new Error(`Comment with id ${id} not found`);
    }
    return comment;
};
