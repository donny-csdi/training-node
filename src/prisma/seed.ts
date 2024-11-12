import prisma from "../config/prismaClient.config";

const main = async () => {
  const promo = await prisma.promo.create({
    data: {
      title: "Summar Sale",
    },
  });

  const tags = await Promise.all([
    prisma.tag.create({
      data: {
        name: "Technology",
      },
    }),
    prisma.tag.create({
      data: {
        name: "Lifestyle",
      },
    }),
  ]);

  const article = await prisma.article.create({
    data: {
      title: "Getting Started with Prisma",
      content: "This is a sample article about Prisma...",
      promoId: promo.id,
      articleTags: {
        create: tags.map((tag) => ({
          tagId: tag.id,
        })),
      },
    },
  });

  const car1 = await prisma.car.create({
    data: {
      image:
        "https://netimg.acc.co.id/ACCONE/PAYMENT_METHOD/PAYMENT_METHOD_1717558.PNG",
      name: "Toyota Camry",
      model: "2023",
      variant: "Hybrid",
      price: 30000,
      isNew: true,
    },
  });

  const car2 = await prisma.car.create({
    data: {
      image:
        "https://netimg.acc.co.id/ACCONE/PAYMENT_METHOD/PAYMENT_METHOD_1717531.PNG",
      name: "Honda Accord",
      model: "2022",
      variant: "Sport",
      price: 27000,
      isNew: false,
    },
  });

  // Seeding data untuk Iklan
  const iklan1 = await prisma.iklan.create({
    data: {
      name: "Promo Akhir Tahun",
      content: "Dapatkan diskon besar untuk pembelian mobil baru.",
      discount: 15.0,
      image:
        "https://netimg.acc.co.id/ACCONE/PAYMENT_METHOD/PAYMENT_METHOD_1767619.JPG",
      carId: car1.id,
    },
  });

  const iklan2 = await prisma.iklan.create({
    data: {
      name: "Promo Musim Panas",
      content: "Diskon khusus untuk mobil bekas.",
      discount: 10.0,
      image:
        "https://netimg.acc.co.id/ACCONE/PAYMENT_METHOD/PAYMENT_METHOD_1767421.JPG",
      carId: car2.id,
    },
  });

  // Seeding data untuk Blog
  const blog1 = await prisma.blog.create({
    data: {
      title: "Tips Memilih Mobil Baru",
      desc: "Panduan lengkap memilih mobil baru yang sesuai dengan kebutuhan Anda.",
      content: "Isi konten blog di sini...",
      image:
        "https://netimg.acc.co.id/ACCONE/CONTENT/DETAILNEWS/webp/Banner-Wisata-Klaten.webp",
      cars: {
        connect: [{ id: car1.id }, { id: car2.id }],
      },
    },
  });

  const blog2 = await prisma.blog.create({
    data: {
      title: "Perawatan Mobil Bekas",
      desc: "Cara merawat mobil bekas agar tetap awet dan nyaman dikendarai.",
      content: "Isi konten blog di sini...",
      image:
        "https://netimg.acc.co.id/ACCONE/CONTENT/DETAILNEWS/webp/oleh-oleh-batam.webp",
      cars: {
        connect: [{ id: car2.id }],
      },
    },
  });

  console.log({
    promo,
    tags,
    article,
    car1,
    car2,
    iklan1,
    iklan2,
    blog1,
    blog2,
  });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
