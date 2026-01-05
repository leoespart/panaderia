
import { db } from "../server/db";
import { settings } from "@shared/schema";
import { eq } from "drizzle-orm";

async function main() {
    console.log("Syncing menu V2 to database...");

    const siteData = {
        isMenuVisible: true,
        categories: [
            {
                id: "bebidas",
                nameEs: "Bebidas",
                nameEn: "Beverages",
                items: [
                    { id: "bc1", nameEs: "Café", nameEn: "Coffee", price: "", descEs: "Variedad de tamaños (6oz, 8oz, 12oz)", descEn: "Variety of sizes (6oz, 8oz, 12oz)", popular: true },
                    { id: "be1", nameEs: "Batidas", nameEn: "Shakes", price: "", descEs: "Fresa, Vainilla, Chocolate", descEn: "Strawberry, Vanilla, Chocolate", popular: true },
                    { id: "be3", nameEs: "Jugos Naturales (16oz)", nameEn: "Natural Juices (16oz)", price: "", descEs: "100% fruta natural", descEn: "100% natural fruit", popular: true },
                    { id: "bc4", nameEs: "Chocolate", nameEn: "Hot Chocolate", price: "", descEs: "Regular (8oz) o Grande (12oz)", descEn: "Regular (8oz) or Large (12oz)" },
                    { id: "be2", nameEs: "Morir Soñando", nameEn: "Dominican orange juice with milk", price: "", descEs: "Jugo de naranja con leche", descEn: "Orange juice with milk" }
                ]
            },
            {
                id: "desayunos",
                nameEs: "Desayunos",
                nameEn: "Breakfast",
                items: [
                    { id: "r1", nameEs: "Revoltillos", nameEn: "Scrambled Eggs", price: "", descEs: "Huevos, jamón, queso y tostadas", descEn: "Eggs, ham, cheese and toast", popular: true },
                    { id: "t1", nameEs: "Tostadas", nameEn: "Toast", price: "", descEs: "Mantequilla, Mayonesa y Queso", descEn: "Butter, Mayo and Cheese" },
                    { id: "c1", nameEs: "Cremas", nameEn: "Porridge", price: "", descEs: "Avenas, Farinas y Arina", descEn: "Oatmeal, Cream of Wheat, Cornmeal" }
                ]
            },
            {
                id: "sandwiches",
                nameEs: "Sándwiches",
                nameEn: "Sandwiches",
                items: [
                    { id: "sp3", nameEs: "Tripleta", nameEn: "Three Meat Sandwich", price: "", descEs: "Jamón, Cerdo, Bistec", descEn: "Ham, Pork, Steak", popular: true },
                    { id: "sp4", nameEs: "Cubano", nameEn: "Cuban Sandwich", price: "", descEs: "Pernil, jamón, queso suizo, pepinillo", descEn: "Roast pork, ham, swiss cheese, pickles", popular: true },
                    { id: "sp1", nameEs: "Jamón, Queso y Huevo", nameEn: "Ham, Cheese & Egg Sandwich", price: "", descEs: "Completo y delicioso", descEn: "Complete and delicious", popular: true },
                    { id: "s1", nameEs: "Jamón y Queso", nameEn: "Ham & Cheese Sandwich", price: "", descEs: "Clásico con queso americano", descEn: "Classic with American cheese" },
                    { id: "s2", nameEs: "Jamón y Huevo", nameEn: "Ham & Egg Sandwich", price: "", descEs: "Con huevo frito o revuelto", descEn: "With fried or scrambled egg" },
                    { id: "s3", nameEs: "Queso y Huevo", nameEn: "Cheese & Egg Sandwich", price: "", descEs: "Simple y rico", descEn: "Simple and delicious" },
                    { id: "sp2", nameEs: "Atún", nameEn: "Tuna Sandwich", price: "", descEs: "Ensalada de atún fresca", descEn: "Fresh tuna salad" },
                    { id: "s8", nameEs: "Pastrami", nameEn: "Pastrami Sandwich", price: "", descEs: "Con mostaza y queso", descEn: "With mustard and cheese" },
                    { id: "s9", nameEs: "Bistec", nameEn: "Steak Sandwich", price: "", descEs: "Bistec encebollado", descEn: "Steak with onions" },
                    { id: "s6", nameEs: "Pavo", nameEn: "Turkey Sandwich", price: "", descEs: "Jamón de pavo", descEn: "Turkey ham" },
                    { id: "s7", nameEs: "Pernil", nameEn: "Roast Pork Sandwich", price: "", descEs: "Pernil asado en casa", descEn: "House roasted pork" },
                    { id: "s4", nameEs: "Mortadella y Queso", nameEn: "Mortadella & Cheese Sandwich", price: "", descEs: "Mortadella de calidad", descEn: "Quality mortadella" },
                    { id: "s5", nameEs: "Salami y Queso", nameEn: "Salami & Cheese Sandwich", price: "", descEs: "Salami genova", descEn: "Genoa Salami" }
                ]
            },
            {
                id: "dulces",
                nameEs: "Dulces y Repostería",
                nameEn: "Sweets & Pastries",
                items: [
                    { id: "e1", nameEs: "Quesitos", nameEn: "Cream Cheese Pastry", price: "", descEs: "¡El favorito de la casa!", descEn: "House favorite!", popular: true },
                    { id: "e5", nameEs: "Tres Leches", nameEn: "Three Milks Cake", price: "", descEs: "Bizcocho mojada en 3 leches", descEn: "Cake soaked in 3 milks", popular: true },
                    { id: "e3", nameEs: "Flan de Queso", nameEn: "Cheese Flan", price: "", descEs: "Cremoso y delicioso", descEn: "Creamy and delicious", popular: true },
                    { id: "e4", nameEs: "Cheesecake", nameEn: "Cheesecake", price: "", descEs: "Con topping de fresa o plain", descEn: "Strawberry topping or plain" },
                    { id: "d3", nameEs: "Donas", nameEn: "Donuts", price: "", descEs: "Glasadas, chocolate, rellenas", descEn: "Glazed, chocolate, filled" },
                    { id: "d5", nameEs: "Muffin", nameEn: "Muffin", price: "", descEs: "Arándanos, Maíz, Chocolate", descEn: "Blueberry, Corn, Chocolate" }
                ]
            }
        ]
    };

    try {
        const existing = await db
            .select()
            .from(settings)
            .where(eq(settings.id, 1));

        if (existing.length === 0) {
            await db.insert(settings).values({
                id: 1,
                data: JSON.stringify(siteData)
            });
            console.log("Created initial site settings");
        } else {
            const existingData = JSON.parse(existing[0].data);
            const updatedData = { ...existingData, ...siteData };

            await db
                .update(settings)
                .set({
                    data: JSON.stringify(updatedData)
                })
                .where(eq(settings.id, 1));
            console.log("Updated site settings with Menu V2");
        }
    } catch (e) {
        console.error("Error syncing menu:", e);
        process.exit(1);
    }
}

main();
