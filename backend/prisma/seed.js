const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.setting.deleteMany();

  const especiales = await prisma.category.create({ data: { name: 'Especiales', slug: 'especiales' } });
  const viandas    = await prisma.category.create({ data: { name: 'Viandas', slug: 'viandas' } });
  const promos     = await prisma.category.create({ data: { name: 'Promos', slug: 'promos' } });
  const ensaladas  = await prisma.category.create({ data: { name: 'Ensaladas', slug: 'ensaladas' } });

  console.log('✅ Categorías creadas');

  await prisma.product.createMany({
    data: [
      {
        name: 'Pollo al Horno con Finas Hierbas',
        description: 'Acompañado de papas rústicas y batatas caramelizadas. La especialidad de la casa.',
        price: 4500,
        imageUrl: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c3?w=800&auto=format&fit=crop',
        badge: 'RECOMENDADO',
        featured: true,
        active: true,
        categoryId: especiales.id,
      },
      {
        name: 'Empanadas de Carne',
        description: 'Cortada a cuchillo, receta familiar.',
        price: 900,
        imageUrl: 'https://images.unsplash.com/photo-1604467794349-0b74285de7e7?w=800&auto=format&fit=crop',
        badge: null,
        featured: true,
        active: true,
        categoryId: especiales.id,
      },
      {
        name: 'Ensalada de Estación',
        description: 'Ingredientes frescos de la huerta.',
        price: 2800,
        imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop',
        badge: null,
        featured: true,
        active: true,
        categoryId: ensaladas.id,
      },
      {
        name: 'Milanesa Napolitana XL',
        description: 'La favorita de los domingos. Con jamón cocido, muzzarella y nuestra salsa de tomate casera.',
        price: 5900,
        imageUrl: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=800&auto=format&fit=crop',
        badge: 'Éxito de Ventas',
        featured: true,
        active: true,
        categoryId: especiales.id,
      },
      {
        name: 'Guiso de Lentejas',
        description: 'Con pan artesanal. Nutritivo y reconfortante para el mediodía.',
        price: 3200,
        imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop',
        badge: null,
        featured: false,
        active: true,
        categoryId: viandas.id,
      },
      {
        name: 'Tapa de Asado al Horno',
        description: 'Con puré de papa casero. Tiernísima, cocción lenta.',
        price: 3800,
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop',
        badge: null,
        featured: false,
        active: true,
        categoryId: viandas.id,
      },
      {
        name: 'Promo Familiar',
        description: '2 platos principales + 1 ensalada + postre. Ideal para la familia.',
        price: 9500,
        imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop',
        badge: 'PROMO',
        featured: false,
        active: true,
        categoryId: promos.id,
      },
      {
        name: 'Promo Pareja',
        description: '2 platos + 2 ensaladas a precio especial.',
        price: 6500,
        imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop',
        badge: 'OFERTA',
        featured: false,
        active: true,
        categoryId: promos.id,
      },
    ],
  });

  console.log('✅ Productos creados');

  await prisma.setting.createMany({
    data: [
      { key: 'whatsapp_number', value: '5491112345678' },
      { key: 'phone', value: '0800-CHANETON' },
      { key: 'address', value: 'Calle Falsa 123, Corazón del Barrio, Buenos Aires' },
      { key: 'schedule_weekdays', value: 'Lun a Sáb: 11:00 - 21:00' },
      { key: 'schedule_weekend', value: 'Dom: 11:00 - 15:00' },
      {
        key: 'maps_embed_url',
        value: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.6960862726445!2d-58.38375562346085!3d-34.60976807295628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccafc89b7e80b%3A0xb38ae34de95e68e0!2sPl.+de+Mayo%2C+Buenos+Aires!5e0!3m2!1ses!2sar!4v1715000000000!5m2!1ses!2sar',
      },
      { key: 'hero_image_url', value: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&auto=format&fit=crop' },
      { key: 'contact_hero_image_url', value: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1600&auto=format&fit=crop&q=85' },
      { key: 'hero_badge', value: 'Tradición Familiar desde 1992' },
      { key: 'hero_title', value: 'El placer de la comida real hecha en casa.' },
      { key: 'hero_subtitle', value: 'Recetas de la abuela, ingredientes del mercado y el cariño de siempre. Descubrí el sabor que nos define hace más de 30 años.' },
      { key: 'about_image_url', value: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop' },
      { key: 'about_years', value: '32' },
      { key: 'about_title', value: 'Sabor que trasciende generaciones' },
      { key: 'about_text_1', value: 'Lo que empezó como un pequeño sueño de los Chanetón se convirtió en el punto de encuentro de cada mediodía. Creemos que comer bien no debería ser un lujo, sino un momento de felicidad diaria.' },
      { key: 'about_text_2', value: 'Mantenemos las mismas recetas que usaba nuestra abuela, respetando los tiempos de cocción lenta y seleccionando nosotros mismos cada ingrediente en el mercado local. No hay secretos, solo amor por la cocina.' },
      { key: 'instagram_url', value: 'https://instagram.com' },
      { key: 'facebook_url', value: 'https://facebook.com' },
    ],
  });

  console.log('✅ Configuración creada');
  console.log('🎉 Seed completado exitosamente!');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
