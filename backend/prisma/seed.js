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
      // ── ESPECIALES ────────────────────────────────────────────────
      {
        name: 'Pechuga a la Plancha',
        description: 'Con arroz, puré o ensalada a elección.',
        price: 11000,
        imageUrl: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800&auto=format&fit=crop',
        badge: null,
        featured: true,
        active: true,
        categoryId: especiales.id,
      },
      {
        name: 'Pata Muslo',
        description: 'Con arroz, puré, ensalada o fritas a elección.',
        price: 11000,
        imageUrl: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c3?w=800&auto=format&fit=crop',
        badge: null,
        featured: true,
        active: true,
        categoryId: especiales.id,
      },
      {
        name: 'Milanesa de Carne',
        description: 'Con arroz, puré o fritas a elección.',
        price: 11000,
        imageUrl: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=800&auto=format&fit=crop',
        badge: null,
        featured: true,
        active: true,
        categoryId: especiales.id,
      },
      {
        name: 'Milanesa de Pollo',
        description: 'Con arroz, puré o fritas a elección.',
        price: 11000,
        imageUrl: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop',
        badge: null,
        featured: true,
        active: true,
        categoryId: especiales.id,
      },
      {
        name: 'Napolitana (Carne o Pollo)',
        description: 'Con arroz, puré o fritas a elección. Cubierta con salsa de tomate y mozzarella.',
        price: 13000,
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop',
        badge: 'RECOMENDADO',
        featured: true,
        active: true,
        categoryId: especiales.id,
      },
      // ── VIANDAS ──────────────────────────────────────────────────
      {
        name: 'Puré Mixto',
        description: 'Puré casero combinado. Reconfortante y nutritivo.',
        price: 11000,
        imageUrl: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&auto=format&fit=crop',
        badge: null,
        featured: false,
        active: true,
        categoryId: viandas.id,
      },
      {
        name: 'Tortilla de Papa Entera',
        description: 'Tortilla casera de papa entera, jugosa y esponjosa.',
        price: 11000,
        imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop',
        badge: null,
        featured: false,
        active: true,
        categoryId: viandas.id,
      },
      {
        name: '1/2 Tortilla de Papa',
        description: 'Media porción de tortilla casera de papa.',
        price: 6000,
        imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop',
        badge: null,
        featured: false,
        active: true,
        categoryId: viandas.id,
      },
      {
        name: 'Tarta de Pollo',
        description: 'Tarta casera de pollo con masa crocante.',
        price: 11000,
        imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=800&auto=format&fit=crop',
        badge: null,
        featured: false,
        active: true,
        categoryId: viandas.id,
      },
      {
        name: 'Tarta de Acelga',
        description: 'Tarta casera de acelga, nutritiva y sabrosa.',
        price: 11000,
        imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=800&auto=format&fit=crop',
        badge: null,
        featured: false,
        active: true,
        categoryId: viandas.id,
      },
      {
        name: 'Tarta de Choclo',
        description: 'Tarta casera de choclo, dulce y cremosa.',
        price: 11000,
        imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=800&auto=format&fit=crop',
        badge: null,
        featured: false,
        active: true,
        categoryId: viandas.id,
      },
      {
        name: 'Guiso de Lentejas con Arroz',
        description: 'Guiso casero de lentejas con arroz. Nutritivo y reconfortante para el mediodía.',
        price: 11000,
        imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop',
        badge: null,
        featured: false,
        active: true,
        categoryId: viandas.id,
      },
      {
        name: 'Tallarines con Salsa Fileto',
        description: 'Con carne o pollo a elección. Salsa de tomate casera.',
        price: 11000,
        imageUrl: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&auto=format&fit=crop',
        badge: null,
        featured: true,
        active: true,
        categoryId: viandas.id,
      },
      // ── ENSALADAS ────────────────────────────────────────────────
      {
        name: 'Ensalada',
        description: 'Ensalada fresca del día.',
        price: 6000,
        imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop',
        badge: null,
        featured: false,
        active: true,
        categoryId: ensaladas.id,
      },
      // ── PROMOS ───────────────────────────────────────────────────
      {
        name: '1/2 Tortilla de Papa + Ensalada',
        description: 'Combo: media tortilla de papa más ensalada fresca.',
        price: 11000,
        imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop',
        badge: 'COMBO',
        featured: false,
        active: true,
        categoryId: promos.id,
      },
      {
        name: 'Sandwich de Milanesa con Fritas',
        description: 'Sandwich de milanesa acompañado de papas fritas.',
        price: 14000,
        imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop',
        badge: null,
        featured: true,
        active: true,
        categoryId: promos.id,
      },
      {
        name: 'Sandwich de Ternera con Fritas',
        description: 'Con carne, huevo, jamón, queso, lechuga y tomate. Acompañado de papas fritas.',
        price: 15000,
        imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop',
        badge: 'ESPECIAL',
        featured: true,
        active: true,
        categoryId: promos.id,
      },
    ],
  });

  console.log('✅ Productos creados');

  await prisma.setting.createMany({
    data: [
      { key: 'whatsapp_number', value: '5492995189095' },
      { key: 'phone', value: '299-5189095' },
      { key: 'address', value: 'Chanetón 999 esq. La Plata, Neuquén' },
      { key: 'schedule_weekdays', value: 'Lun a Vie: 10:45 - 15:00' },
      { key: 'schedule_weekend', value: 'Sáb y Dom: Cerrado' },
      {
        key: 'maps_embed_url',
        value: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.6960862726445!2d-58.38375562346085!3d-34.60976807295628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccafc89b7e80b%3A0xb38ae34de95e68e0!2sPl.+de+Mayo%2C+Buenos+Aires!5e0!3m2!1ses!2sar!4v1715000000000!5m2!1ses!2sar',
      },
      { key: 'hero_image_url', value: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&auto=format&fit=crop' },
      { key: 'contact_hero_image_url', value: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1600&auto=format&fit=crop&q=85' },
      { key: 'hero_badge', value: 'Viandas Chanetón desde 2017' },
      { key: 'hero_title', value: 'El placer de la comida real hecha en casa.' },
      { key: 'hero_subtitle', value: 'Recetas caseras, ingredientes del mercado y el cariño de siempre. Somos de Neuquén y estamos desde 2017.' },
      { key: 'about_image_url', value: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop' },
      { key: 'about_years', value: '9' },
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
