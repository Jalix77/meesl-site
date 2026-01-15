import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  console.log('🌱 Seeding CMS data...')

  // Pages
  const pages = [
    { slug: 'home', title: 'Accueil' },
    { slug: 'a-propos', title: 'À propos' },
    { slug: 'visite', title: 'Planifier une visite' },
    { slug: 'regarder', title: 'Regarder les cultes' },
    { slug: 'donner', title: 'Faire un don' },
    { slug: 'contact', title: 'Contact' },
    { slug: 'ressources', title: 'Ressources' },
  ]

  for (const pageData of pages) {
    const page = await prisma.page.upsert({
      where: { slug: pageData.slug },
      update: pageData,
      create: pageData,
    })
    console.log(`✅ Page: ${page.slug}`)
  }

  // Home page sections
  const homePage = await prisma.page.findUnique({ where: { slug: 'home' } })
  if (homePage) {
    const homeSections = [
      {
        key: 'hero',
        title: 'Hero Section',
        body: `# Mission Église Évangélique Sel et Lumière

Une église qui forme, restaure et envoie.

**Rejoignez-nous ce dimanche**`,
        order: 1,
      },
      {
        key: 'presentation',
        title: 'Présentation',
        body: `## Bienvenue à MEESL

Nous sommes une communauté chrétienne engagée à transformer des vies par la puissance de l'Évangile. Notre mission est de former des disciples, restaurer les familles et envoyer des leaders pour servir Dieu et notre communauté.`,
        order: 2,
      },
      {
        key: 'vision',
        title: 'Vision et Mission',
        body: `## Notre Vision

Devenir une église reference qui impacte positivement la société haïtienne par des disciples transformés et engagés.

## Notre Mission

1. **Former** - Enseigner la Parole de Dieu avec clarté et pertinence
2. **Restaurer** - Accompagner les personnes dans leur processus de guérison et croissance
3. **Envoyer** - Équiper et libérer les membres pour servir dans leurs sphères d'influence`,
        order: 3,
      },
    ]

    for (const sectionData of homeSections) {
      await prisma.pageSection.upsert({
        where: { pageId_key: { pageId: homePage.id, key: sectionData.key } },
        update: sectionData,
        create: { ...sectionData, pageId: homePage.id },
      })
    }
    console.log('✅ Home page sections')
  }

  // About page sections
  const aboutPage = await prisma.page.findUnique({ where: { slug: 'a-propos' } })
  if (aboutPage) {
    const aboutSections = [
      {
        key: 'histoire',
        title: 'Notre Histoire',
        body: `## Nos Débuts

Fondée en 2010, Mission Église Évangélique Sel et Lumière a commencé avec une poignée de fidèles passionnés par la vision de voir Haïti transformée par l'Évangile.

## Notre Croissance

Au fil des années, nous avons grandi en nombre et en impact, développant divers ministères pour répondre aux besoins de notre communauté.`,
        order: 1,
      },
      {
        key: 'valeurs',
        title: 'Nos Valeurs',
        body: `## Nos Valeurs Fondamentales

### **Prière**
Nous croyons au pouvoir de la prière pour transformer des vies et des situations.

### **Parole**
La Bible est notre autorité suprême et notre guide pour la vie quotidienne.

### **Communauté**
Nous valorisons les relations authentiques et le soutien mutuel.

### **Service**
Chaque membre est appelé à servir selon ses dons et ses talents.

### **Mission**
Nous sommes engagés à partager l'Évangile localement et globalement.`,
        order: 2,
      },
    ]

    for (const sectionData of aboutSections) {
      await prisma.pageSection.upsert({
        where: { pageId_key: { pageId: aboutPage.id, key: sectionData.key } },
        update: sectionData,
        create: { ...sectionData, pageId: aboutPage.id },
      })
    }
    console.log('✅ About page sections')
  }

  // Site Settings
  const settings = [
    {
      key: 'address',
      value: '4, Delmas 48, Port-au-Prince, Haïti',
      type: 'text',
    },
    {
      key: 'whatsapp',
      value: '+509 37 97 1717',
      type: 'text',
    },
    {
      key: 'phone',
      value: '+509 37 97 1717',
      type: 'text',
    },
    {
      key: 'email',
      value: 'contact@meesl.org',
      type: 'text',
    },
    {
      key: 'schedule',
      value: JSON.stringify({
        dimanche: { culte: '8h30 - 10h30', ecole_dominicale: '10h00 - 11h00' },
        mercredi: { etude_biblique: '17h - 19h' },
        samedi: { jeunesse: '15h - 17h', femmes: '2e et 4e samedis 10h' },
      }),
      type: 'json',
    },
    {
      key: 'donations',
      value: JSON.stringify({
        unibank: {
          name: 'Mission Église Évangélique Sel et Lumière',
          account: '001-00012345-6',
          currency: 'HTG',
        },
        moncash: {
          phone: '+509 37 97 1717',
          name: 'MEESL',
        },
        natcash: {
          phone: '+509 37 97 1717',
          name: 'MEESL',
        },
      }),
      type: 'json',
    },
    {
      key: 'leadership',
      value: JSON.stringify([
        { name: 'Pasteur Jean Pierre', role: 'Pasteur Principal', email: 'jp@meesl.org' },
        { name: 'Pasteur Marie Claire', role: 'Pasteur Associé', email: 'mc@meesl.org' },
        { name: 'Élder Joseph Michel', role: 'Ancien', email: 'jm@meesl.org' },
        { name: 'Sœur Anne Sophie', role: 'Directrice Femmes', email: 'as@meesl.org' },
        { name: 'Frère Paul Jean', role: 'Directeur Jeunesse', email: 'pj@meesl.org' },
      ]),
      type: 'json',
    },
    {
      key: 'logoUrl',
      value: '/images/LOGO_MEESL.png',
      type: 'url',
    },
    {
      key: 'constitutionPdfUrl',
      value: '/files/constitution-meesl.pdf',
      type: 'url',
    },
  ]

  for (const settingData of settings) {
    await prisma.siteSetting.upsert({
      where: { key: settingData.key },
      update: settingData,
      create: settingData,
    })
  }
  console.log('✅ Site settings')

  console.log('🎉 CMS seeding completed!')
}

seed()
  .catch((e) => {
    console.error('❌ Error seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
