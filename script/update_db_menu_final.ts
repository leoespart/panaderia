
import { db } from "../server/db";
import { settings } from "@shared/schema";
import { eq } from "drizzle-orm";

async function updateMenu() {
    console.log("Updating menu data...");

    const existingSettings = await db.select().from(settings).limit(1);
    let currentData = existingSettings.length > 0 ? JSON.parse(existingSettings[0].data) : {};

    // Final Menu Structure
    const newMenuData = {
        ...currentData,
        isMenuVisible: true, // Default to visible as requested
        categories: [
            {
                id: "bebidas",
                nameEs: "Bebidas",
                nameEn: "Beverages",
                items: [
                    // Specials First
                    { id: "be1", nameEs: "Batidas", nameEn: "Shakes", price: "$5.00", descEs: "Fresa, Vainilla, Chocolate", descEn: "Strawberry, Vanilla, Chocolate", popular: true },
                    { id: "be2", nameEs: "Morir Soñando", nameEn: "Dominican orange juice with milk", price: "$5.00", descEs: "Jugo de naranja con leche", descEn: "Dominican orange juice with milk", popular: true },
                    { id: "be3", nameEs: "Jugos Naturales (16oz)", nameEn: "Natural Juices (16oz)", price: "$3.50", descEs: "100% fruta natural", descEn: "100% natural fruit", popular: true },

                    // Hot Drinks (Simplified)
                    { id: "bc1", nameEs: "Café", nameEn: "Coffee", price: "$2.24 - $4.22", descEs: "Variedad de tamaños (6oz, 8oz, 12oz)", descEn: "Variety of sizes (6oz, 8oz, 12oz)", popular: true },
                    { id: "bc4", nameEs: "Chocolate", nameEn: "Hot Chocolate", price: "$2.75 - $3.75", descEs: "Regular (8oz) o Grande (12oz)", descEn: "Regular (8oz) or Large (12oz)" },

                    // Cold Drinks
                    { id: "bf1", nameEs: "Agua", nameEn: "Water", price: "$1.00", descEs: "Agua purificada", descEn: "Purified water" },
                    { id: "bf2", nameEs: "Jugo Embotellado", nameEn: "Bottled Juice", price: "$2.00", descEs: "Variedad de sabores", descEn: "Variety of flavors" },
                    { id: "bf3", nameEs: "Refresco de Lata", nameEn: "Canned Soda", price: "$1.35", descEs: "Coca-Cola, Sprite, etc.", descEn: "Coca-Cola, Sprite, etc." },
                    { id: "bf4", nameEs: "Refresco de Botella", nameEn: "Bottled Soda", price: "$2.00", descEs: "Variedad de refrescos", descEn: "Variety of sodas" },
                    { id: "bf5", nameEs: "Bebidas Energéticas", nameEn: "Energy Drinks", price: "$2.00", descEs: "Monster, Red Bull", descEn: "Monster, Red Bull" }
                ]
            },
            {
                id: "desayunos",
                nameEs: "Desayunos",
                nameEn: "Breakfast",
                items: [
                    // Revoltillo
                    { id: "r1", nameEs: "Revoltillo Regular", nameEn: "Scrambled Eggs Regular", price: "$5.25", descEs: "Huevos revueltos frescos", descEn: "Fresh scrambled eggs" },
                    { id: "r2", nameEs: "Revoltillo con Queso Suizo", nameEn: "Scrambled eggs & Swiss Cheese", price: "$6.25", descEs: "Con queso suizo derretido", descEn: "With melted Swiss cheese" },
                    { id: "r3", nameEs: "Revoltillo Con Todo", nameEn: "Scrambled eggs with everything", price: "$7.25", descEs: "Jamón, queso y vegetales", descEn: "Ham, cheese and vegetables" },

                    // Toast
                    { id: "t1", nameEs: "Tostada con Mantequilla", nameEn: "Toast with Butter", price: "$2.25", descEs: "Pan sobao o de agua", descEn: "Sobao or water bread" },
                    { id: "t2", nameEs: "Tostada con Queso", nameEn: "Toast with Cheese", price: "$3.25", descEs: "Con queso americano", descEn: "With American cheese" },

                    // Cremas
                    { id: "c1", nameEs: "Avena", nameEn: "Oatmeal", price: "$3.00", descEs: "Disponible hasta las 11am", descEn: "Available until 11am" },
                    { id: "c2", nameEs: "Crema de Maiz", nameEn: "Cornmeal Porridge", price: "$3.00", descEs: "Disponible hasta las 11am", descEn: "Available until 11am" }
                ]
            },
            {
                id: "sandwiches",
                nameEs: "Sándwiches",
                nameEn: "Sandwiches",
                items: [
                    // Popular Ones First
                    { id: "sp3", nameEs: "Tripleta", nameEn: "Three Meat Sandwich", price: "$8.00", descEs: "Jamón, Cerdo, Bistec", descEn: "Ham, Pork, Steak", popular: true },
                    { id: "sp4", nameEs: "Cubano", nameEn: "Cuban Sandwich", price: "$9.25", descEs: "Pernil, jamón, queso suizo, pepinillo", descEn: "Pork, ham, swiss cheese, pickles", popular: true },
                    { id: "sp1", nameEs: "Jamón, Queso y Huevo", nameEn: "Ham, Cheese & Egg Sandwich", price: "$6.25", descEs: "Completo y delicioso", descEn: "Complete and delicious", popular: true },
                    { id: "s1", nameEs: "Jamón y Queso", nameEn: "Ham & Cheese Sandwich", price: "$5.25", descEs: "Clásico con queso americano", descEn: "Classic with American cheese" },
                    { id: "s2", nameEs: "Jamón y Huevo", nameEn: "Ham & Egg Sandwich", price: "$6.00", descEs: "Con huevo frito o revuelto", descEn: "With fried or scrambled egg" },
                    { id: "s3", nameEs: "Queso y Huevo", nameEn: "Cheese & Egg Sandwich", price: "$6.00", descEs: "Simple y rico", descEn: "Simple and tasty" },
                    { id: "sp2", nameEs: "Atún", nameEn: "Tuna Sandwich", price: "$6.95", descEs: "Ensalada de atún fresca", descEn: "Fresh tuna salad" },
                    { id: "s8", nameEs: "Pastrami", nameEn: "Pastrami Sandwich", price: "$9.25", descEs: "Con mostaza y queso", descEn: "With mustard and cheese" },
                    { id: "s9", nameEs: "Bistec", nameEn: "Steak Sandwich", price: "$9.25", descEs: "Bistec encebollado", descEn: "Steak with onions" },
                    { id: "s6", nameEs: "Pavo", nameEn: "Turkey Sandwich", price: "$6.95", descEs: "Jamón de pavo", descEn: "Turkey ham" },
                    { id: "s7", nameEs: "Pernil", nameEn: "Roast Pork Sandwich", price: "$8.95", descEs: "Pernil asado en casa", descEn: "House roasted pork" },
                    { id: "s4", nameEs: "Mortadella y Queso", nameEn: "Mortadella & Cheese Sandwich", price: "$6.25", descEs: "Mortadella de calidad", descEn: "Quality mortadella" },
                    { id: "s5", nameEs: "Salami y Queso", nameEn: "Salami & Cheese Sandwich", price: "$6.25", descEs: "Salami genova", descEn: "Genoa salami" }
                ]
            },
            {
                id: "dulces",
                nameEs: "Dulces y Repostería",
                nameEn: "Sweets & Pastries",
                items: [
                    // Popular First (Quesitos, Tres Leches, Flan)
                    { id: "e1", nameEs: "Quesitos", nameEn: "Cream Cheese Pastry", price: "$2.00", descEs: "¡El favorito de la casa!", descEn: "House favorite!", popular: true },
                    { id: "e5", nameEs: "Tres Leches", nameEn: "Three Milks Cake", price: "$3.50", descEs: "Bizcocho mojada en 3 leches", descEn: "Cake soaked in 3 milks", popular: true },
                    { id: "e3", nameEs: "Flan de Queso", nameEn: "Cheese Flan", price: "$3.50", descEs: "Cremoso y delicioso", descEn: "Creamy and delicious", popular: true },
                    { id: "e4", nameEs: "Cheesecake", nameEn: "Cheesecake", price: "$3.50", descEs: "Con topping de fresa o plain", descEn: "With strawberry topping or plain" },

                    // Others
                    { id: "e2", nameEs: "Bizcocho", nameEn: "Cake", price: "$3.00", descEs: "Vainilla o Chocolate", descEn: "Vanilla or Chocolate" },
                    { id: "d3", nameEs: "Donas", nameEn: "Donuts", price: "$1.50 - $2.00", descEs: "Glasadas, chocolate, rellenas", descEn: "Glazed, chocolate, filled" },
                    { id: "d2", nameEs: "Pastelillo Relleno (Tornillo)", nameEn: "Turnovers (Tornillo)", price: "$1.50", descEs: "Guayaba o Queso", descEn: "Guava or Cheese" },
                    { id: "d1", nameEs: "Galletas", nameEn: "Cookies", price: "$0.50", descEs: "Mantecaditos", descEn: "Shortbread cookies" },
                    { id: "d4", nameEs: "Bizcocho de Maiz", nameEn: "Cornbread", price: "$1.50", descEs: "Dulce y suave", descEn: "Sweet and soft" },
                    { id: "d5", nameEs: "Muffin", nameEn: "Muffin", price: "$2.00", descEs: "Arándanos, Maíz, Chocolate", descEn: "Blueberry, Corn, Chocolate" }
                ]
            }
        ]
    };

    if (existingSettings.length > 0) {
        await db.update(settings).set({ data: JSON.stringify(newMenuData) }).where(eq(settings.id, existingSettings[0].id));
    } else {
        await db.insert(settings).values({ data: JSON.stringify(newMenuData) });
    }

    console.log("Menu updated successfully!");
}

updateMenu().catch(console.error);
