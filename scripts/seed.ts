import prisma from '../lib/prisma'

async function main() {
  console.log('🌱 Seeding database...')

  // Create Areas
  const sukhumvit = await prisma.area.create({
    data: {
      slug: 'sukhumvit',
      translations: {
        create: [
          { locale: 'ja', name: 'スクンビット' },
          { locale: 'en', name: 'Sukhumvit' },
          { locale: 'th', name: 'สุขุมวิท' },
        ],
      },
    },
  })

  const silom = await prisma.area.create({
    data: {
      slug: 'silom',
      translations: {
        create: [
          { locale: 'ja', name: 'シーロム' },
          { locale: 'en', name: 'Silom' },
          { locale: 'th', name: 'สีลม' },
        ],
      },
    },
  })

  console.log('✅ Areas created')

  // Create Categories
  const restaurant = await prisma.category.create({
    data: {
      slug: 'restaurant',
      translations: {
        create: [
          { locale: 'ja', name: 'レストラン' },
          { locale: 'en', name: 'Restaurant' },
          { locale: 'th', name: 'ร้านอาหาร' },
        ],
      },
    },
  })

  const cafe = await prisma.category.create({
    data: {
      slug: 'cafe',
      translations: {
        create: [
          { locale: 'ja', name: 'カフェ' },
          { locale: 'en', name: 'Cafe' },
          { locale: 'th', name: 'คาเฟ่' },
        ],
      },
    },
  })

  console.log('✅ Categories created')

  // Create Tags
  const japanese = await prisma.tag.create({
    data: {
      slug: 'japanese-food',
      translations: {
        create: [
          { locale: 'ja', name: '日本料理' },
          { locale: 'en', name: 'Japanese Food' },
          { locale: 'th', name: 'อาหารญี่ปุ่น' },
        ],
      },
    },
  })

  const wifi = await prisma.tag.create({
    data: {
      slug: 'free-wifi',
      translations: {
        create: [
          { locale: 'ja', name: '無料WiFi' },
          { locale: 'en', name: 'Free WiFi' },
          { locale: 'th', name: 'WiFi ฟรี' },
        ],
      },
    },
  })

  console.log('✅ Tags created')

  // Create Sample Place
  await prisma.place.create({
    data: {
      slug: 'sample-japanese-restaurant',
      status: 'PUBLISHED',
      areaId: sukhumvit.id,
      categoryId: restaurant.id,
      priceRange: 3,
      phone: '+66-2-123-4567',
      address: '123 Sukhumvit Road, Bangkok',
      latitude: 13.7563,
      longitude: 100.5018,
      featured: true,
      translations: {
        create: [
          {
            locale: 'ja',
            name: 'サンプル日本料理店',
            description: 'バンコクで本格的な日本料理を提供するレストランです。',
          },
          {
            locale: 'en',
            name: 'Sample Japanese Restaurant',
            description: 'Authentic Japanese cuisine in Bangkok.',
          },
          {
            locale: 'th',
            name: 'ร้านอาหารญี่ปุ่นตัวอย่าง',
            description: 'ร้านอาหารญี่ปุ่นแท้ในกรุงเทพฯ',
          },
        ],
      },
      tags: {
        create: [{ tagId: japanese.id }, { tagId: wifi.id }],
      },
    },
  })

  console.log('✅ Sample place created')

  // Create Sample Article
  await prisma.article.create({
    data: {
      slug: 'welcome-to-bangkok',
      type: 'GUIDE',
      published: true,
      featured: true,
      publishedAt: new Date(),
      translations: {
        create: [
          {
            locale: 'ja',
            title: 'バンコクへようこそ',
            content: 'バンコクでの生活を始めるためのガイドです。',
            excerpt: 'バンコク生活ガイド',
          },
          {
            locale: 'en',
            title: 'Welcome to Bangkok',
            content: 'A guide to starting your life in Bangkok.',
            excerpt: 'Bangkok living guide',
          },
          {
            locale: 'th',
            title: 'ยินดีต้อนรับสู่กรุงเทพฯ',
            content: 'คู่มือการใช้ชีวิตในกรุงเทพฯ',
            excerpt: 'คู่มือการใช้ชีวิต',
          },
        ],
      },
    },
  })

  console.log('✅ Sample article created')

  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
