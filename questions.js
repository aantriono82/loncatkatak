/* Bank soal dikelompokkan menurut tingkat kesulitan, dan setiap soal ditandai
   dengan properti "shape" (kubus/balok/prisma/limas) untuk mendukung mode
   pemilihan bangun ruang. answer adalah indeks jawaban benar: 0=A, 1=B, 2=C,
   3=D. Urutan soal dan pilihan diacak setiap permainan. Mendukung format
   matematika KaTeX ($...$) dan ilustrasi spasial (SVG). */
(function (root) {
  'use strict';

  const questions = {
    mudah: [
      {
        id: 'mudah-kubus-rusuk',
        text: 'Berapa jumlah rusuk pada kubus?',
        illustration: 'kubus-3d',
        shape: 'kubus',
        options: ['8', '10', '12', '16'],
        answer: 2,
        explanation: 'Kubus memiliki 12 rusuk sama panjang: 4 rusuk alas, 4 rusuk atas, dan 4 rusuk tegak.'
      },
      {
        id: 'mudah-kubus-volume',
        text: 'Volume kubus dengan panjang rusuk $4\\text{ cm}$ adalah …',
        illustration: 'kubus-3d',
        shape: 'kubus',
        options: ['$16\\text{ cm}^3$', '$32\\text{ cm}^3$', '$64\\text{ cm}^3$', '$128\\text{ cm}^3$'],
        answer: 2,
        explanation: '$V = s^3 = 4^3 = 64\\text{ cm}^3$.'
      },
      {
        id: 'mudah-kubus-luas',
        text: 'Luas permukaan kubus dengan panjang rusuk $5\\text{ cm}$ adalah …',
        illustration: 'jaring-kubus',
        shape: 'kubus',
        options: ['$100\\text{ cm}^2$', '$125\\text{ cm}^2$', '$150\\text{ cm}^2$', '$175\\text{ cm}^2$'],
        answer: 2,
        explanation: '$L = 6 \\times s^2 = 6 \\times 5^2 = 150\\text{ cm}^2$.'
      },
      {
        id: 'mudah-kubus-sudut',
        text: 'Berapa jumlah titik sudut pada kubus?',
        illustration: 'kubus-3d',
        shape: 'kubus',
        options: ['4', '6', '8', '12'],
        answer: 2,
        explanation: 'Kubus memiliki 8 titik sudut, yaitu titik pertemuan tiga rusuk yang saling tegak lurus.'
      },
      {
        id: 'mudah-kubus-bidang',
        text: 'Berapa jumlah bidang sisi pada kubus?',
        illustration: 'kubus-3d',
        shape: 'kubus',
        options: ['4', '6', '8', '12'],
        answer: 1,
        explanation: 'Kubus memiliki 6 bidang sisi berbentuk persegi yang kongruen.'
      },
      {
        id: 'mudah-kubus-volume-3cm',
        text: 'Volume kubus dengan panjang rusuk $3\\text{ cm}$ adalah …',
        illustration: 'kubus-3d',
        shape: 'kubus',
        options: ['$9\\text{ cm}^3$', '$18\\text{ cm}^3$', '$27\\text{ cm}^3$', '$36\\text{ cm}^3$'],
        answer: 2,
        explanation: '$V = s^3 = 3^3 = 27\\text{ cm}^3$.'
      },
      {
        id: 'mudah-kubus-volume-6cm',
        text: 'Volume kubus dengan panjang rusuk $6\\text{ cm}$ adalah …',
        illustration: 'kubus-3d',
        shape: 'kubus',
        options: ['$36\\text{ cm}^3$', '$180\\text{ cm}^3$', '$216\\text{ cm}^3$', '$256\\text{ cm}^3$'],
        answer: 2,
        explanation: '$V = s^3 = 6^3 = 216\\text{ cm}^3$.'
      },
      {
        id: 'mudah-kubus-luas-3cm',
        text: 'Luas permukaan kubus dengan panjang rusuk $3\\text{ cm}$ adalah …',
        illustration: 'jaring-kubus',
        shape: 'kubus',
        options: ['$18\\text{ cm}^2$', '$36\\text{ cm}^2$', '$54\\text{ cm}^2$', '$72\\text{ cm}^2$'],
        answer: 2,
        explanation: '$L = 6s^2 = 6 \\times 3^2 = 54\\text{ cm}^2$.'
      },
      {
        id: 'mudah-kubus-luas-6cm',
        text: 'Luas permukaan kubus dengan panjang rusuk $6\\text{ cm}$ adalah …',
        illustration: 'jaring-kubus',
        shape: 'kubus',
        options: ['$96\\text{ cm}^2$', '$144\\text{ cm}^2$', '$180\\text{ cm}^2$', '$216\\text{ cm}^2$'],
        answer: 3,
        explanation: '$L = 6s^2 = 6 \\times 6^2 = 216\\text{ cm}^2$.'
      },
      {
        id: 'mudah-kubus-rusuk-volume125',
        text: 'Sebuah kubus memiliki volume $125\\text{ cm}^3$. Panjang rusuknya adalah …',
        illustration: 'kubus-3d',
        shape: 'kubus',
        options: ['$4\\text{ cm}$', '$5\\text{ cm}$', '$6\\text{ cm}$', '$25\\text{ cm}$'],
        answer: 1,
        explanation: '$s = \\sqrt[3]{125} = 5\\text{ cm}$ karena $5^3 = 125$.'
      },
      {
        id: 'mudah-balok-volume',
        text: 'Volume balok dengan panjang $3\\text{ cm}$, lebar $4\\text{ cm}$, dan tinggi $5\\text{ cm}$ adalah …',
        illustration: 'balok-3d',
        shape: 'balok',
        options: ['$12\\text{ cm}^3$', '$45\\text{ cm}^3$', '$60\\text{ cm}^3$', '$75\\text{ cm}^3$'],
        answer: 2,
        explanation: '$V = p \\times l \\times t = 3 \\times 4 \\times 5 = 60\\text{ cm}^3$.'
      },
      {
        id: 'mudah-balok-luas',
        text: 'Luas permukaan balok dengan $p = 6\\text{ cm}$, $l = 3\\text{ cm}$, dan $t = 2\\text{ cm}$ adalah …',
        illustration: 'balok-3d',
        shape: 'balok',
        options: ['$36\\text{ cm}^2$', '$60\\text{ cm}^2$', '$72\\text{ cm}^2$', '$84\\text{ cm}^2$'],
        answer: 2,
        explanation: '$L = 2(pl + pt + lt) = 2(18 + 12 + 6) = 2(36) = 72\\text{ cm}^2$.'
      },
      {
        id: 'mudah-balok-sisi',
        text: 'Banyak bidang sisi pada balok adalah …',
        illustration: 'balok-3d',
        shape: 'balok',
        options: ['4', '5', '6', '8'],
        answer: 2,
        explanation: 'Balok memiliki 6 bidang sisi berbentuk persegi panjang yang berpasangan kongruen.'
      },
      {
        id: 'mudah-balok-rusuk',
        text: 'Berapa jumlah rusuk pada balok?',
        illustration: 'balok-3d',
        shape: 'balok',
        options: ['6', '8', '10', '12'],
        answer: 3,
        explanation: 'Balok memiliki 12 rusuk: 4 rusuk panjang, 4 rusuk lebar, dan 4 rusuk tinggi.'
      },
      {
        id: 'mudah-balok-titik-sudut',
        text: 'Berapa jumlah titik sudut pada balok?',
        illustration: 'balok-3d',
        shape: 'balok',
        options: ['4', '6', '8', '12'],
        answer: 2,
        explanation: 'Balok memiliki 8 titik sudut, sama seperti kubus.'
      },
      {
        id: 'mudah-balok-pasangan-sisi',
        text: 'Banyak pasang sisi balok yang kongruen (sama bentuk dan ukuran) adalah …',
        illustration: 'balok-3d',
        shape: 'balok',
        options: ['1 pasang', '2 pasang', '3 pasang', '6 pasang'],
        answer: 2,
        explanation: 'Balok memiliki 6 bidang sisi yang berpasangan kongruen: alas-tutup, depan-belakang, dan kiri-kanan, sehingga totalnya 3 pasang.'
      },
      {
        id: 'mudah-balok-volume-2',
        text: 'Volume balok dengan panjang $6\\text{ cm}$, lebar $4\\text{ cm}$, dan tinggi $2\\text{ cm}$ adalah …',
        illustration: 'balok-3d',
        shape: 'balok',
        options: ['$24\\text{ cm}^3$', '$36\\text{ cm}^3$', '$48\\text{ cm}^3$', '$56\\text{ cm}^3$'],
        answer: 2,
        explanation: '$V = p \\times l \\times t = 6 \\times 4 \\times 2 = 48\\text{ cm}^3$.'
      },
      {
        id: 'mudah-balok-volume-3',
        text: 'Volume balok dengan panjang $10\\text{ cm}$, lebar $5\\text{ cm}$, dan tinggi $4\\text{ cm}$ adalah …',
        illustration: 'balok-3d',
        shape: 'balok',
        options: ['$100\\text{ cm}^3$', '$150\\text{ cm}^3$', '$190\\text{ cm}^3$', '$200\\text{ cm}^3$'],
        answer: 3,
        explanation: '$V = p \\times l \\times t = 10 \\times 5 \\times 4 = 200\\text{ cm}^3$.'
      },
      {
        id: 'mudah-balok-luas-2',
        text: 'Luas permukaan balok dengan $p = 4\\text{ cm}$, $l = 3\\text{ cm}$, dan $t = 2\\text{ cm}$ adalah …',
        illustration: 'balok-3d',
        shape: 'balok',
        options: ['$26\\text{ cm}^2$', '$44\\text{ cm}^2$', '$52\\text{ cm}^2$', '$60\\text{ cm}^2$'],
        answer: 2,
        explanation: '$L = 2(pl + pt + lt) = 2(12 + 8 + 6) = 2(26) = 52\\text{ cm}^2$.'
      },
      {
        id: 'mudah-balok-luas-3',
        text: 'Luas permukaan balok dengan $p = 10\\text{ cm}$, $l = 6\\text{ cm}$, dan $t = 5\\text{ cm}$ adalah …',
        illustration: 'balok-3d',
        shape: 'balok',
        options: ['$200\\text{ cm}^2$', '$240\\text{ cm}^2$', '$260\\text{ cm}^2$', '$280\\text{ cm}^2$'],
        answer: 3,
        explanation: '$L = 2(pl + pt + lt) = 2(60 + 50 + 30) = 2(140) = 280\\text{ cm}^2$.'
      },
      {
        id: 'mudah-prisma-sifat',
        text: 'Bagaimana hubungan kedua bidang alas pada prisma?',
        shape: 'prisma',
        options: ['Berbeda bentuk dan ukuran', 'Kongruen dan sejajar', 'Selalu berbentuk persegi', 'Hanya memiliki satu bidang alas'],
        answer: 1,
        explanation: 'Prisma memiliki dua bidang (alas dan tutup) yang kongruen (sama bentuk dan ukuran) serta sejajar.'
      },
      {
        id: 'mudah-prisma-segitiga',
        text: 'Prisma segitiga memiliki berapa bidang sisi secara keseluruhan?',
        illustration: 'prisma-segitiga',
        shape: 'prisma',
        options: ['4 bidang', '5 bidang', '6 bidang', '7 bidang'],
        answer: 1,
        explanation: 'Prisma segitiga memiliki 5 sisi: 2 sisi segitiga (alas & tutup) dan 3 sisi tegak persegi panjang.'
      },
      {
        id: 'mudah-prisma-rusuk',
        text: 'Berapa jumlah rusuk pada prisma segitiga?',
        illustration: 'prisma-segitiga',
        shape: 'prisma',
        options: ['6', '7', '8', '9'],
        answer: 3,
        explanation: 'Prisma segitiga memiliki 9 rusuk: 3 rusuk alas, 3 rusuk atas (tutup), dan 3 rusuk tegak yang menghubungkan keduanya.'
      },
      {
        id: 'mudah-prisma-titik-sudut',
        text: 'Berapa jumlah titik sudut pada prisma segitiga?',
        illustration: 'prisma-segitiga',
        shape: 'prisma',
        options: ['4', '5', '6', '8'],
        answer: 2,
        explanation: 'Prisma segitiga memiliki 6 titik sudut, yaitu 3 pada alas dan 3 pada tutup.'
      },
      {
        id: 'mudah-prisma-segienam-rusuk',
        text: 'Prisma segienam memiliki berapa jumlah rusuk?',
        shape: 'prisma',
        options: ['12', '15', '18', '24'],
        answer: 2,
        explanation: 'Prisma segi-$n$ memiliki $3n$ rusuk. Untuk segienam ($n=6$), banyak rusuknya $= 3 \\times 6 = 18$.'
      },
      {
        id: 'mudah-prisma-segienam-sudut',
        text: 'Prisma segienam memiliki berapa titik sudut?',
        shape: 'prisma',
        options: ['6', '10', '12', '16'],
        answer: 2,
        explanation: 'Prisma segi-$n$ memiliki $2n$ titik sudut. Untuk segienam ($n=6$), banyaknya $= 2 \\times 6 = 12$.'
      },
      {
        id: 'mudah-prisma-segienam-sisi',
        text: 'Prisma segienam memiliki berapa bidang sisi?',
        shape: 'prisma',
        options: ['6', '7', '8', '9'],
        answer: 2,
        explanation: 'Prisma segi-$n$ memiliki $n+2$ bidang sisi. Untuk segienam, banyaknya $= 6 + 2 = 8$.'
      },
      {
        id: 'mudah-prisma-volume-langsung',
        text: 'Sebuah prisma memiliki luas alas $20\\text{ cm}^2$ dan tinggi $9\\text{ cm}$. Volume prisma tersebut adalah …',
        shape: 'prisma',
        options: ['$29\\text{ cm}^3$', '$90\\text{ cm}^3$', '$180\\text{ cm}^3$', '$360\\text{ cm}^3$'],
        answer: 2,
        explanation: '$V = \\text{luas alas} \\times t = 20 \\times 9 = 180\\text{ cm}^3$.'
      },
      {
        id: 'mudah-prisma-volume-segitiga',
        text: 'Alas sebuah prisma berbentuk segitiga siku-siku dengan sisi siku-siku $6\\text{ cm}$ dan $8\\text{ cm}$. Jika tinggi prisma $10\\text{ cm}$, volume prisma tersebut adalah …',
        illustration: 'prisma-segitiga',
        shape: 'prisma',
        options: ['$120\\text{ cm}^3$', '$180\\text{ cm}^3$', '$240\\text{ cm}^3$', '$480\\text{ cm}^3$'],
        answer: 2,
        explanation: 'Luas alas $= \\frac12 \\times 6 \\times 8 = 24\\text{ cm}^2$. Volume $= 24 \\times 10 = 240\\text{ cm}^3$.'
      },
      {
        id: 'mudah-prisma-luas-langsung',
        text: 'Sebuah prisma memiliki luas alas $30\\text{ cm}^2$, keliling alas $24\\text{ cm}$, dan tinggi $12\\text{ cm}$. Luas permukaan prisma tersebut adalah …',
        shape: 'prisma',
        options: ['$288\\text{ cm}^2$', '$318\\text{ cm}^2$', '$348\\text{ cm}^2$', '$408\\text{ cm}^2$'],
        answer: 2,
        explanation: '$L = 2 \\times \\text{luas alas} + (\\text{keliling alas} \\times t) = 2(30) + 24(12) = 60 + 288 = 348\\text{ cm}^2$.'
      },
      {
        id: 'mudah-limas-rusuk',
        text: 'Limas segi empat memiliki berapa rusuk?',
        illustration: 'limas-3d',
        shape: 'limas',
        options: ['5', '6', '8', '10'],
        answer: 2,
        explanation: 'Limas segi empat memiliki 4 rusuk alas dan 4 rusuk tegak, sehingga totalnya ada 8 rusuk.'
      },
      {
        id: 'mudah-limas-volume',
        text: 'Volume limas beralas persegi dengan sisi $6\\text{ cm}$ dan tinggi $9\\text{ cm}$ adalah …',
        illustration: 'limas-3d',
        shape: 'limas',
        options: ['$54\\text{ cm}^3$', '$108\\text{ cm}^3$', '$162\\text{ cm}^3$', '$324\\text{ cm}^3$'],
        answer: 1,
        explanation: '$V = \\frac{1}{3} \\times \\text{luas alas} \\times t = \\frac{1}{3} \\times (6 \\times 6) \\times 9 = 108\\text{ cm}^3$.'
      },
      {
        id: 'mudah-limas-titik-sudut',
        text: 'Limas segiempat memiliki berapa jumlah titik sudut?',
        illustration: 'limas-3d',
        shape: 'limas',
        options: ['4', '5', '6', '8'],
        answer: 1,
        explanation: 'Limas segiempat memiliki 5 titik sudut, yaitu 4 titik sudut pada alas dan 1 titik puncak.'
      },
      {
        id: 'mudah-limas-bidang-sisi',
        text: 'Limas segiempat memiliki berapa bidang sisi?',
        illustration: 'limas-3d',
        shape: 'limas',
        options: ['4', '5', '6', '8'],
        answer: 1,
        explanation: 'Limas segiempat memiliki 5 bidang sisi: 1 bidang alas dan 4 bidang sisi tegak berbentuk segitiga.'
      },
      {
        id: 'mudah-limas-segitiga-rusuk',
        text: 'Limas segitiga memiliki berapa jumlah rusuk?',
        shape: 'limas',
        options: ['4', '5', '6', '8'],
        answer: 2,
        explanation: 'Limas segitiga memiliki 6 rusuk: 3 rusuk alas dan 3 rusuk tegak yang bertemu di titik puncak.'
      },
      {
        id: 'mudah-limas-segitiga-sisi',
        text: 'Limas segitiga memiliki berapa bidang sisi?',
        shape: 'limas',
        options: ['3', '4', '5', '6'],
        answer: 1,
        explanation: 'Limas segitiga memiliki 4 bidang sisi, seluruhnya berbentuk segitiga (1 alas dan 3 sisi tegak).'
      },
      {
        id: 'mudah-limas-volume-1',
        text: 'Volume limas beralas persegi dengan sisi $6\\text{ cm}$ dan tinggi $12\\text{ cm}$ adalah …',
        illustration: 'limas-3d',
        shape: 'limas',
        options: ['$72\\text{ cm}^3$', '$108\\text{ cm}^3$', '$144\\text{ cm}^3$', '$216\\text{ cm}^3$'],
        answer: 2,
        explanation: '$V = \\frac13 \\times s^2 \\times t = \\frac13 \\times 6^2 \\times 12 = 144\\text{ cm}^3$.'
      },
      {
        id: 'mudah-limas-volume-2',
        text: 'Volume limas beralas persegi dengan sisi $9\\text{ cm}$ dan tinggi $6\\text{ cm}$ adalah …',
        illustration: 'limas-3d',
        shape: 'limas',
        options: ['$81\\text{ cm}^3$', '$108\\text{ cm}^3$', '$162\\text{ cm}^3$', '$243\\text{ cm}^3$'],
        answer: 2,
        explanation: '$V = \\frac13 \\times 9^2 \\times 6 = \\frac13 \\times 81 \\times 6 = 162\\text{ cm}^3$.'
      },
      {
        id: 'mudah-limas-volume-langsung',
        text: 'Sebuah limas memiliki luas alas $50\\text{ cm}^2$ dan tinggi $9\\text{ cm}$. Volume limas tersebut adalah …',
        shape: 'limas',
        options: ['$75\\text{ cm}^3$', '$100\\text{ cm}^3$', '$150\\text{ cm}^3$', '$450\\text{ cm}^3$'],
        answer: 2,
        explanation: '$V = \\frac13 \\times \\text{luas alas} \\times t = \\frac13 \\times 50 \\times 9 = 150\\text{ cm}^3$.'
      },
      {
        id: 'mudah-limas-luas-langsung',
        text: 'Sebuah limas memiliki luas alas $64\\text{ cm}^2$ dan jumlah luas seluruh sisi tegaknya $96\\text{ cm}^2$. Luas permukaan limas tersebut adalah …',
        shape: 'limas',
        options: ['$96\\text{ cm}^2$', '$128\\text{ cm}^2$', '$160\\text{ cm}^2$', '$192\\text{ cm}^2$'],
        answer: 2,
        explanation: 'Luas permukaan $= \\text{luas alas} + \\text{jumlah luas sisi tegak} = 64 + 96 = 160\\text{ cm}^2$.'
      }
    ],
    sedang: [
      {
        id: 'sedang-kubus-sisi',
        text: 'Luas permukaan sebuah kubus adalah $294\\text{ cm}^2$. Panjang rusuknya adalah …',
        illustration: 'kubus-3d',
        shape: 'kubus',
        options: ['$6\\text{ cm}$', '$7\\text{ cm}$', '$8\\text{ cm}$', '$9\\text{ cm}$'],
        answer: 1,
        explanation: '$6s^2 = 294 \\implies s^2 = 49 \\implies s = \\sqrt{49} = 7\\text{ cm}$.'
      },
      {
        id: 'sedang-kubus-perubahan',
        text: 'Sebuah kubus berubah panjang rusuknya dari $4\\text{ cm}$ menjadi $6\\text{ cm}$. Pertambahan volumenya adalah …',
        illustration: 'kubus-3d',
        shape: 'kubus',
        options: ['$128\\text{ cm}^3$', '$152\\text{ cm}^3$', '$192\\text{ cm}^3$', '$216\\text{ cm}^3$'],
        answer: 1,
        explanation: 'Pertambahan volume $= 6^3 - 4^3 = 216 - 64 = 152\\text{ cm}^3$.'
      },
      {
        id: 'sedang-kubus-diagonal',
        text: 'Diagonal ruang kubus dengan panjang rusuk $6\\text{ cm}$ adalah …',
        illustration: 'kubus-diagonal',
        shape: 'kubus',
        options: ['$6\\sqrt{2}\\text{ cm}$', '$6\\sqrt{3}\\text{ cm}$', '$12\\text{ cm}$', '$18\\text{ cm}$'],
        answer: 1,
        explanation: 'Diagonal ruang kubus dirumuskan $d = s\\sqrt{3}$. Dengan $s = 6\\text{ cm}$, maka $d = 6\\sqrt{3}\\text{ cm}$.'
      },
      {
        id: 'sedang-kubus-luas-dari-volume',
        text: 'Sebuah kubus memiliki volume $343\\text{ cm}^3$. Luas permukaan kubus tersebut adalah …',
        illustration: 'kubus-3d',
        shape: 'kubus',
        options: ['$196\\text{ cm}^2$', '$254\\text{ cm}^2$', '$294\\text{ cm}^2$', '$336\\text{ cm}^2$'],
        answer: 2,
        explanation: '$s = \\sqrt[3]{343} = 7\\text{ cm}$, sehingga $L = 6s^2 = 6 \\times 49 = 294\\text{ cm}^2$.'
      },
      {
        id: 'sedang-kubus-volume-dari-luas',
        text: 'Luas permukaan sebuah kubus adalah $384\\text{ cm}^2$. Volume kubus tersebut adalah …',
        illustration: 'kubus-3d',
        shape: 'kubus',
        options: ['$256\\text{ cm}^3$', '$448\\text{ cm}^3$', '$512\\text{ cm}^3$', '$576\\text{ cm}^3$'],
        answer: 2,
        explanation: '$s^2 = 384 \\div 6 = 64 \\implies s = 8\\text{ cm}$, sehingga $V = s^3 = 8^3 = 512\\text{ cm}^3$.'
      },
      {
        id: 'sedang-kubus-diagonal-bidang',
        text: 'Panjang diagonal bidang (sisi) sebuah kubus dengan rusuk $8\\text{ cm}$ adalah …',
        illustration: 'kubus-3d',
        shape: 'kubus',
        options: ['$8\\text{ cm}$', '$8\\sqrt{2}\\text{ cm}$', '$8\\sqrt{3}\\text{ cm}$', '$16\\text{ cm}$'],
        answer: 1,
        explanation: 'Diagonal bidang kubus dirumuskan $d = s\\sqrt{2}$, sehingga $d = 8\\sqrt{2}\\text{ cm}$.'
      },
      {
        id: 'sedang-kubus-pertambahan-luas',
        text: 'Panjang rusuk sebuah kubus berubah dari $5\\text{ cm}$ menjadi $8\\text{ cm}$. Pertambahan luas permukaannya adalah …',
        illustration: 'kubus-3d',
        shape: 'kubus',
        options: ['$174\\text{ cm}^2$', '$204\\text{ cm}^2$', '$234\\text{ cm}^2$', '$264\\text{ cm}^2$'],
        answer: 2,
        explanation: 'Pertambahan luas $= 6(8^2 - 5^2) = 6(64-25) = 6(39) = 234\\text{ cm}^2$.'
      },
      {
        id: 'sedang-kubus-perbandingan-volume',
        text: 'Perbandingan volume dua kubus adalah $8:27$. Jika panjang rusuk kubus kecil $4\\text{ cm}$, panjang rusuk kubus besar adalah …',
        illustration: 'kubus-3d',
        shape: 'kubus',
        options: ['$5\\text{ cm}$', '$6\\text{ cm}$', '$8\\text{ cm}$', '$9\\text{ cm}$'],
        answer: 1,
        explanation: 'Akar pangkat tiga dari $8:27$ adalah perbandingan rusuk $2:3$. Karena rusuk kecil $=4\\text{ cm}$ mewakili 2 bagian, tiap bagian $=2\\text{ cm}$, sehingga rusuk besar $=3\\times2=6\\text{ cm}$.'
      },
      {
        id: 'sedang-kubus-bak-air',
        text: 'Sebuah bak mandi berbentuk kubus dengan panjang rusuk $50\\text{ cm}$ diisi penuh dengan air. Volume air yang dibutuhkan adalah …',
        illustration: 'kubus-3d',
        shape: 'kubus',
        options: ['$12{,}5\\text{ liter}$', '$125\\text{ liter}$', '$1.250\\text{ liter}$', '$12.500\\text{ liter}$'],
        answer: 1,
        explanation: '$V = s^3 = 50^3 = 125.000\\text{ cm}^3$. Karena $1.000\\text{ cm}^3 = 1\\text{ liter}$, maka $V = 125\\text{ liter}$.'
      },
      {
        id: 'sedang-kubus-selisih-volume2',
        text: 'Sebuah kubus memiliki panjang diagonal bidang $6\\sqrt{2}\\text{ cm}$. Volume kubus tersebut adalah …',
        illustration: 'kubus-diagonal',
        shape: 'kubus',
        options: ['$36\\text{ cm}^3$', '$108\\text{ cm}^3$', '$216\\text{ cm}^3$', '$432\\text{ cm}^3$'],
        answer: 2,
        explanation: 'Karena $d = s\\sqrt2 = 6\\sqrt2$, maka $s = 6\\text{ cm}$, sehingga $V = s^3 = 6^3 = 216\\text{ cm}^3$.'
      },
      {
        id: 'sedang-balok-tinggi',
        text: 'Volume balok dengan panjang $8\\text{ cm}$, lebar $5\\text{ cm}$, dan tinggi $6\\text{ cm}$ adalah …',
        illustration: 'balok-3d',
        shape: 'balok',
        options: ['$160\\text{ cm}^3$', '$200\\text{ cm}^3$', '$240\\text{ cm}^3$', '$300\\text{ cm}^3$'],
        answer: 2,
        explanation: '$V = p \\times l \\times t = 8 \\times 5 \\times 6 = 240\\text{ cm}^3$.'
      },
      {
        id: 'sedang-balok-luas-tinggi',
        text: 'Luas permukaan balok dengan $p = 8\\text{ cm}$ dan $l = 5\\text{ cm}$ adalah $340\\text{ cm}^2$. Tinggi balok tersebut …',
        illustration: 'balok-3d',
        shape: 'balok',
        options: ['$8\\text{ cm}$', '$10\\text{ cm}$', '$12\\text{ cm}$', '$15\\text{ cm}$'],
        answer: 1,
        explanation: '$340 = 2(8\\times 5 + 8t + 5t) = 2(40 + 13t) \\implies 170 = 40 + 13t \\implies 13t = 130 \\implies t = 10\\text{ cm}$.'
      },
      {
        id: 'sedang-balok-skala',
        text: 'Jika semua ukuran balok $10\\text{ cm} \\times 6\\text{ cm} \\times 4\\text{ cm}$ dilipatgandakan menjadi dua kali, volumenya menjadi …',
        illustration: 'balok-3d',
        shape: 'balok',
        options: ['$480\\text{ cm}^3$', '$960\\text{ cm}^3$', '$1.440\\text{ cm}^3$', '$1.920\\text{ cm}^3$'],
        answer: 3,
        explanation: '$\\text{Volume baru} = (2p)(2l)(2t) = 8 \\times (p \\times l \\times t) = 8 \\times 240 = 1.920\\text{ cm}^3$.'
      },
      {
        id: 'sedang-balok-tinggi-dari-volume',
        text: 'Sebuah balok memiliki panjang $12\\text{ cm}$, lebar $8\\text{ cm}$, dan volume $672\\text{ cm}^3$. Tinggi balok tersebut adalah …',
        illustration: 'balok-3d',
        shape: 'balok',
        options: ['$5\\text{ cm}$', '$6\\text{ cm}$', '$7\\text{ cm}$', '$8\\text{ cm}$'],
        answer: 2,
        explanation: '$t = V \\div (p \\times l) = 672 \\div (12 \\times 8) = 672 \\div 96 = 7\\text{ cm}$.'
      },
      {
        id: 'sedang-balok-skala-sebangun',
        text: 'Dua balok sebangun memiliki perbandingan panjang rusuk $2:3$. Jika volume balok kecil $80\\text{ cm}^3$, volume balok besar adalah …',
        illustration: 'balok-3d',
        shape: 'balok',
        options: ['$120\\text{ cm}^3$', '$180\\text{ cm}^3$', '$240\\text{ cm}^3$', '$270\\text{ cm}^3$'],
        answer: 3,
        explanation: 'Perbandingan volume $= 2^3:3^3 = 8:27$. Karena balok kecil $=80\\text{ cm}^3$ mewakili 8 bagian, tiap bagian $=10\\text{ cm}^3$, sehingga balok besar $=27\\times10=270\\text{ cm}^3$.'
      },
      {
        id: 'sedang-balok-rasio-dimensi',
        text: 'Sebuah balok memiliki perbandingan panjang, lebar, dan tinggi $3:2:1$. Jika volume balok tersebut $162\\text{ cm}^3$, panjang balok adalah …',
        illustration: 'balok-3d',
        shape: 'balok',
        options: ['$6\\text{ cm}$', '$9\\text{ cm}$', '$12\\text{ cm}$', '$18\\text{ cm}$'],
        answer: 1,
        explanation: 'Misalkan $p=3x,\\,l=2x,\\,t=x$. Maka $V = 3x\\times2x\\times x = 6x^3 = 162 \\implies x^3 = 27 \\implies x = 3$. Jadi panjang $= 3x = 9\\text{ cm}$.'
      },
      {
        id: 'sedang-balok-tinggi-air',
        text: 'Sebuah bak berbentuk balok dengan alas berukuran $80\\text{ cm}\\times50\\text{ cm}$ diisi air sebanyak $100$ liter. Tinggi air dalam bak tersebut adalah …',
        illustration: 'balok-3d',
        shape: 'balok',
        options: ['$15\\text{ cm}$', '$20\\text{ cm}$', '$25\\text{ cm}$', '$30\\text{ cm}$'],
        answer: 2,
        explanation: 'Volume air $=100\\text{ liter}=100.000\\text{ cm}^3$. Tinggi air $=100.000\\div(80\\times50)=100.000\\div4.000=25\\text{ cm}$.'
      },
      {
        id: 'sedang-balok-pertambahan-luas',
        text: 'Sebuah balok memiliki panjang $10\\text{ cm}$ dan lebar $5\\text{ cm}$. Jika tingginya diubah dari $4\\text{ cm}$ menjadi $9\\text{ cm}$, pertambahan luas permukaannya adalah …',
        illustration: 'balok-3d',
        shape: 'balok',
        options: ['$90\\text{ cm}^2$', '$120\\text{ cm}^2$', '$150\\text{ cm}^2$', '$180\\text{ cm}^2$'],
        answer: 2,
        explanation: 'Luas awal $=2(50+40+20)=220\\text{ cm}^2$. Luas akhir $=2(50+90+45)=370\\text{ cm}^2$. Pertambahan $=370-220=150\\text{ cm}^2$.'
      },
      {
        id: 'sedang-balok-luas-dari-volume-tinggi',
        text: 'Sebuah balok memiliki volume $480\\text{ cm}^3$ dan tinggi $8\\text{ cm}$. Jika lebar balok $6\\text{ cm}$, luas permukaan balok tersebut adalah …',
        illustration: 'balok-3d',
        shape: 'balok',
        options: ['$316\\text{ cm}^2$', '$346\\text{ cm}^2$', '$376\\text{ cm}^2$', '$406\\text{ cm}^2$'],
        answer: 2,
        explanation: 'Panjang $=V\\div(l\\times t)=480\\div(6\\times8)=10\\text{ cm}$. Luas permukaan $=2(pl+pt+lt)=2(60+80+48)=376\\text{ cm}^2$.'
      },
      {
        id: 'sedang-balok-diagonal-bidang',
        text: 'Sebuah balok memiliki panjang $8\\text{ cm}$ dan lebar $6\\text{ cm}$. Panjang diagonal bidang alasnya adalah …',
        illustration: 'balok-3d',
        shape: 'balok',
        options: ['$8\\text{ cm}$', '$9\\text{ cm}$', '$10\\text{ cm}$', '$12\\text{ cm}$'],
        answer: 2,
        explanation: 'Diagonal alas $=\\sqrt{p^2+l^2}=\\sqrt{8^2+6^2}=\\sqrt{64+36}=\\sqrt{100}=10\\text{ cm}$.'
      },
      {
        id: 'sedang-prisma-luas',
        text: 'Prisma memiliki luas alas $24\\text{ cm}^2$, keliling alas $18\\text{ cm}$, dan tinggi $10\\text{ cm}$. Luas permukaannya adalah …',
        illustration: 'prisma-segitiga',
        shape: 'prisma',
        options: ['$204\\text{ cm}^2$', '$228\\text{ cm}^2$', '$240\\text{ cm}^2$', '$264\\text{ cm}^2$'],
        answer: 1,
        explanation: '$L = 2 \\times \\text{luas alas} + (\\text{keliling alas} \\times t) = 2(24) + 18(10) = 48 + 180 = 228\\text{ cm}^2$.'
      },
      {
        id: 'sedang-prisma-alas',
        text: 'Volume sebuah prisma $360\\text{ cm}^3$ dan tingginya $8\\text{ cm}$. Luas alas prisma adalah …',
        illustration: 'prisma-segitiga',
        shape: 'prisma',
        options: ['$5\\text{ cm}^2$', '$8\\text{ cm}^2$', '$45\\text{ cm}^2$', '$53\\text{ cm}^2$'],
        answer: 2,
        explanation: '$\\text{Luas alas} = \\text{Volume} \\div t = 360 \\div 8 = 45\\text{ cm}^2$.'
      },
      {
        id: 'sedang-prisma-volume-phytagoras',
        text: 'Alas sebuah prisma berbentuk segitiga siku-siku dengan sisi siku-siku $7\\text{ cm}$ dan $24\\text{ cm}$. Jika tinggi prisma $15\\text{ cm}$, volume prisma tersebut adalah …',
        illustration: 'prisma-segitiga',
        shape: 'prisma',
        options: ['$630\\text{ cm}^3$', '$840\\text{ cm}^3$', '$1.050\\text{ cm}^3$', '$1.260\\text{ cm}^3$'],
        answer: 3,
        explanation: 'Luas alas $=\\frac12\\times7\\times24=84\\text{ cm}^2$. Volume $=84\\times15=1.260\\text{ cm}^3$.'
      },
      {
        id: 'sedang-prisma-volume-trapesium',
        text: 'Alas sebuah prisma berbentuk trapesium dengan sisi sejajar $10\\text{ cm}$ dan $16\\text{ cm}$, serta tinggi trapesium $5\\text{ cm}$. Jika tinggi prisma $12\\text{ cm}$, volume prisma tersebut adalah …',
        illustration: 'prisma-trapesium',
        shape: 'prisma',
        options: ['$520\\text{ cm}^3$', '$650\\text{ cm}^3$', '$780\\text{ cm}^3$', '$910\\text{ cm}^3$'],
        answer: 2,
        explanation: 'Luas alas trapesium $=\\frac{10+16}{2}\\times5=65\\text{ cm}^2$. Volume $=65\\times12=780\\text{ cm}^3$.'
      },
      {
        id: 'sedang-prisma-tinggi-dari-volume',
        text: 'Volume sebuah prisma $600\\text{ cm}^3$ dengan luas alas $40\\text{ cm}^2$. Tinggi prisma tersebut adalah …',
        shape: 'prisma',
        options: ['$10\\text{ cm}$', '$12\\text{ cm}$', '$15\\text{ cm}$', '$20\\text{ cm}$'],
        answer: 2,
        explanation: '$t = V \\div \\text{luas alas} = 600 \\div 40 = 15\\text{ cm}$.'
      },
      {
        id: 'sedang-prisma-luas-alas-dari-permukaan',
        text: 'Luas permukaan sebuah prisma $456\\text{ cm}^2$, dengan keliling alas $30\\text{ cm}$ dan tinggi $9\\text{ cm}$. Luas alas prisma tersebut adalah …',
        shape: 'prisma',
        options: ['$63\\text{ cm}^2$', '$78\\text{ cm}^2$', '$93\\text{ cm}^2$', '$108\\text{ cm}^2$'],
        answer: 2,
        explanation: '$L = 2\\times\\text{luas alas} + (\\text{keliling alas}\\times t) \\implies 456 = 2\\times\\text{luas alas} + 270 \\implies \\text{luas alas} = (456-270)\\div2 = 93\\text{ cm}^2$.'
      },
      {
        id: 'sedang-prisma-skala-volume',
        text: 'Dua prisma sebangun memiliki perbandingan sisi alas $2:3$ dan tinggi yang sama. Jika volume prisma kecil $48\\text{ cm}^3$, volume prisma besar adalah …',
        shape: 'prisma',
        options: ['$72\\text{ cm}^3$', '$96\\text{ cm}^3$', '$108\\text{ cm}^3$', '$144\\text{ cm}^3$'],
        answer: 2,
        explanation: 'Karena tinggi sama, perbandingan volume sama dengan perbandingan luas alas, yaitu $2^2:3^2=4:9$. Volume besar $=\\frac94\\times48=108\\text{ cm}^3$.'
      },
      {
        id: 'sedang-prisma-keliling-dari-permukaan',
        text: 'Luas permukaan sebuah prisma $390\\text{ cm}^2$, luas alasnya $45\\text{ cm}^2$, dan tingginya $15\\text{ cm}$. Keliling alas prisma tersebut adalah …',
        shape: 'prisma',
        options: ['$15\\text{ cm}$', '$18\\text{ cm}$', '$20\\text{ cm}$', '$24\\text{ cm}$'],
        answer: 2,
        explanation: '$L = 2\\times\\text{luas alas} + (\\text{keliling}\\times t) \\implies 390 = 90 + (\\text{keliling}\\times15) \\implies \\text{keliling} = (390-90)\\div15 = 20\\text{ cm}$.'
      },
      {
        id: 'sedang-prisma-segiempat-volume',
        text: 'Alas sebuah prisma berbentuk persegi dengan panjang sisi $9\\text{ cm}$. Jika tinggi prisma $14\\text{ cm}$, volume prisma tersebut adalah …',
        shape: 'prisma',
        options: ['$756\\text{ cm}^3$', '$945\\text{ cm}^3$', '$1.134\\text{ cm}^3$', '$1.260\\text{ cm}^3$'],
        answer: 2,
        explanation: 'Luas alas $=9\\times9=81\\text{ cm}^2$. Volume $=81\\times14=1.134\\text{ cm}^3$.'
      },
      {
        id: 'sedang-prisma-luas-total-langsung',
        text: 'Sebuah prisma memiliki luas alas $56\\text{ cm}^2$, keliling alas $34\\text{ cm}$, dan tinggi $11\\text{ cm}$. Luas permukaan prisma tersebut adalah …',
        shape: 'prisma',
        options: ['$412\\text{ cm}^2$', '$448\\text{ cm}^2$', '$486\\text{ cm}^2$', '$524\\text{ cm}^2$'],
        answer: 2,
        explanation: '$L = 2\\times\\text{luas alas} + (\\text{keliling}\\times t) = 2(56) + 34(11) = 112 + 374 = 486\\text{ cm}^2$.'
      },
      {
        id: 'sedang-limas-volume',
        text: 'Volume limas beralas persegi dengan sisi $10\\text{ cm}$ dan tinggi $12\\text{ cm}$ adalah …',
        illustration: 'limas-3d',
        shape: 'limas',
        options: ['$240\\text{ cm}^3$', '$360\\text{ cm}^3$', '$400\\text{ cm}^3$', '$1.200\\text{ cm}^3$'],
        answer: 2,
        explanation: '$V = \\frac{1}{3} \\times s^2 \\times t = \\frac{1}{3} \\times 10^2 \\times 12 = 400\\text{ cm}^3$.'
      },
      {
        id: 'sedang-limas-sisi',
        text: 'Volume limas beralas persegi dengan sisi $12\\text{ cm}$ dan tinggi $15\\text{ cm}$ adalah …',
        illustration: 'limas-3d',
        shape: 'limas',
        options: ['$540\\text{ cm}^3$', '$720\\text{ cm}^3$', '$900\\text{ cm}^3$', '$2.160\\text{ cm}^3$'],
        answer: 1,
        explanation: '$V = \\frac{1}{3} \\times 12^2 \\times 15 = \\frac{1}{3} \\times 144 \\times 15 = 720\\text{ cm}^3$.'
      },
      {
        id: 'sedang-limas-tinggi-dari-volume',
        text: 'Volume sebuah limas beralas persegi $384\\text{ cm}^3$ dengan panjang sisi alas $12\\text{ cm}$. Tinggi limas tersebut adalah …',
        illustration: 'limas-3d',
        shape: 'limas',
        options: ['$6\\text{ cm}$', '$7\\text{ cm}$', '$8\\text{ cm}$', '$9\\text{ cm}$'],
        answer: 2,
        explanation: 'Luas alas $=12^2=144\\text{ cm}^2$. Tinggi $=\\frac{3V}{\\text{luas alas}}=\\frac{3\\times384}{144}=8\\text{ cm}$.'
      },
      {
        id: 'sedang-limas-sisi-dari-volume',
        text: 'Volume limas beralas persegi $588\\text{ cm}^3$ dengan tinggi $9\\text{ cm}$. Panjang sisi alas limas tersebut adalah …',
        illustration: 'limas-3d',
        shape: 'limas',
        options: ['$12\\text{ cm}$', '$13\\text{ cm}$', '$14\\text{ cm}$', '$16\\text{ cm}$'],
        answer: 2,
        explanation: 'Luas alas $=\\frac{3V}{t}=\\frac{3\\times588}{9}=196\\text{ cm}^2$. Panjang sisi $=\\sqrt{196}=14\\text{ cm}$.'
      },
      {
        id: 'sedang-limas-luas-permukaan',
        text: 'Limas segi empat beraturan memiliki sisi alas $10\\text{ cm}$ dan tinggi sisi tegak $13\\text{ cm}$. Luas permukaannya adalah …',
        illustration: 'limas-slant',
        shape: 'limas',
        options: ['$300\\text{ cm}^2$', '$330\\text{ cm}^2$', '$360\\text{ cm}^2$', '$390\\text{ cm}^2$'],
        answer: 2,
        explanation: 'Luas alas $=10^2=100\\text{ cm}^2$. Luas 4 sisi tegak $=4\\times(\\frac12\\times10\\times13)=260\\text{ cm}^2$. Total $L=100+260=360\\text{ cm}^2$.'
      },
      {
        id: 'sedang-limas-alas-persegipanjang',
        text: 'Sebuah limas memiliki alas berbentuk persegi panjang dengan panjang $8\\text{ cm}$ dan lebar $6\\text{ cm}$. Jika tinggi limas $9\\text{ cm}$, volume limas tersebut adalah …',
        illustration: 'limas-3d',
        shape: 'limas',
        options: ['$96\\text{ cm}^3$', '$120\\text{ cm}^3$', '$144\\text{ cm}^3$', '$216\\text{ cm}^3$'],
        answer: 2,
        explanation: 'Luas alas $=8\\times6=48\\text{ cm}^2$. Volume $=\\frac13\\times48\\times9=144\\text{ cm}^3$.'
      },
      {
        id: 'sedang-limas-skala-volume',
        text: 'Dua limas sebangun memiliki perbandingan sisi alas $2:3$ dengan tinggi yang sama. Jika volume limas kecil $64\\text{ cm}^3$, volume limas besar adalah …',
        shape: 'limas',
        options: ['$96\\text{ cm}^3$', '$108\\text{ cm}^3$', '$144\\text{ cm}^3$', '$216\\text{ cm}^3$'],
        answer: 2,
        explanation: 'Karena tinggi sama, perbandingan volume sama dengan perbandingan luas alas, yaitu $2^2:3^2=4:9$. Volume besar $=\\frac94\\times64=144\\text{ cm}^3$.'
      },
      {
        id: 'sedang-limas-slant-dari-luas',
        text: 'Luas permukaan sebuah limas segiempat beraturan $340\\text{ cm}^2$ dengan sisi alas $10\\text{ cm}$. Tinggi sisi tegak limas tersebut adalah …',
        illustration: 'limas-slant',
        shape: 'limas',
        options: ['$10\\text{ cm}$', '$11\\text{ cm}$', '$12\\text{ cm}$', '$14\\text{ cm}$'],
        answer: 2,
        explanation: 'Luas 4 sisi tegak $=340-10^2=240\\text{ cm}^2$, tiap sisi tegak $=60\\text{ cm}^2=\\frac12\\times10\\times t_{\\text{sisi}} \\implies t_{\\text{sisi}}=12\\text{ cm}$.'
      },
      {
        id: 'sedang-limas-luas-permukaan-2',
        text: 'Limas segi empat beraturan memiliki sisi alas $14\\text{ cm}$ dan tinggi sisi tegak $15\\text{ cm}$. Luas permukaannya adalah …',
        illustration: 'limas-slant',
        shape: 'limas',
        options: ['$490\\text{ cm}^2$', '$546\\text{ cm}^2$', '$616\\text{ cm}^2$', '$672\\text{ cm}^2$'],
        answer: 2,
        explanation: 'Luas alas $=14^2=196\\text{ cm}^2$. Luas 4 sisi tegak $=4\\times(\\frac12\\times14\\times15)=420\\text{ cm}^2$. Total $L=196+420=616\\text{ cm}^2$.'
      },
      {
        id: 'sedang-limas-volume-dari-luasalas',
        text: 'Sebuah limas memiliki luas alas $75\\text{ cm}^2$ dan volume $450\\text{ cm}^3$. Tinggi limas tersebut adalah …',
        shape: 'limas',
        options: ['$12\\text{ cm}$', '$15\\text{ cm}$', '$18\\text{ cm}$', '$20\\text{ cm}$'],
        answer: 2,
        explanation: 'Tinggi $=\\frac{3V}{\\text{luas alas}}=\\frac{3\\times450}{75}=18\\text{ cm}$.'
      }
    ],
    sulit: [
      {
        id: 'sulit-kubus-luas-volume',
        text: 'Sebuah kubus memiliki volume $1.728\\text{ cm}^3$. Luas permukaannya adalah …',
        illustration: 'kubus-3d',
        shape: 'kubus',
        options: ['$576\\text{ cm}^2$', '$728\\text{ cm}^2$', '$864\\text{ cm}^2$', '$1.036\\text{ cm}^2$'],
        answer: 2,
        explanation: 'Rusuk $s = \\sqrt[3]{1.728} = 12\\text{ cm}$. Luas permukaan $L = 6 \\times 12^2 = 6 \\times 144 = 864\\text{ cm}^2$.'
      },
      {
        id: 'sulit-kubus-peleburan',
        text: 'Kubus dengan rusuk $12\\text{ cm}$ dipotong menjadi 8 kubus kecil yang sama besar. Pertambahan total luas permukaannya adalah …',
        illustration: 'kubus-potong-8',
        shape: 'kubus',
        options: ['$432\\text{ cm}^2$', '$864\\text{ cm}^2$', '$1.296\\text{ cm}^2$', '$1.728\\text{ cm}^2$'],
        answer: 1,
        explanation: 'Luas awal $= 6 \\times 12^2 = 864\\text{ cm}^2$. Setiap kubus kecil bersisi $6\\text{ cm}$, total luas 8 kubus $= 8 \\times 6 \\times 6^2 = 1.728\\text{ cm}^2$. Pertambahan $= 1.728 - 864 = 864\\text{ cm}^2$.'
      },
      {
        id: 'sulit-kubus-diagonal-ke-volume',
        text: 'Panjang diagonal ruang sebuah kubus adalah $12\\sqrt{3}\\text{ cm}$. Volume kubus tersebut adalah …',
        illustration: 'kubus-diagonal',
        shape: 'kubus',
        options: ['$864\\text{ cm}^3$', '$1.331\\text{ cm}^3$', '$1.728\\text{ cm}^3$', '$2.744\\text{ cm}^3$'],
        answer: 2,
        explanation: 'Karena $d=s\\sqrt3=12\\sqrt3$, diperoleh $s=12\\text{ cm}$, sehingga $V=s^3=12^3=1.728\\text{ cm}^3$.'
      },
      {
        id: 'sulit-kubus-potong-balok',
        text: 'Sebuah kubus kayu dengan panjang rusuk $12\\text{ cm}$ dipotong tepat di tengah menjadi dua balok yang kongruen. Volume salah satu balok tersebut adalah …',
        illustration: 'kubus-3d',
        shape: 'kubus',
        options: ['$432\\text{ cm}^3$', '$576\\text{ cm}^3$', '$864\\text{ cm}^3$', '$1.728\\text{ cm}^3$'],
        answer: 2,
        explanation: 'Volume kubus $=12^3=1.728\\text{ cm}^3$. Karena dipotong menjadi dua balok kongruen, volume tiap balok $=1.728\\div2=864\\text{ cm}^3$.'
      },
      {
        id: 'sulit-kubus-aljabar-volume',
        text: 'Panjang rusuk sebuah kubus dinyatakan sebagai $(x+2)\\text{ cm}$. Jika $x=3$, volume kubus tersebut adalah …',
        shape: 'kubus',
        options: ['$25\\text{ cm}^3$', '$75\\text{ cm}^3$', '$100\\text{ cm}^3$', '$125\\text{ cm}^3$'],
        answer: 3,
        explanation: 'Panjang rusuk $=x+2=3+2=5\\text{ cm}$, sehingga $V=s^3=5^3=125\\text{ cm}^3$.'
      },
      {
        id: 'sulit-kubus-skala-luas',
        text: 'Jika panjang rusuk sebuah kubus diperbesar menjadi 3 kali panjang semula, luas permukaan kubus yang baru menjadi berapa kali luas permukaan semula?',
        shape: 'kubus',
        options: ['3 kali', '6 kali', '9 kali', '27 kali'],
        answer: 2,
        explanation: 'Luas permukaan kubus berbanding lurus dengan kuadrat rusuknya ($L=6s^2$). Jika rusuk menjadi $3s$, luas permukaan menjadi $9\\times6s^2$, yaitu 9 kali luas semula.'
      },
      {
        id: 'sulit-kubus-cat-dua-sisi',
        text: 'Sebuah kubus besar berukuran $4\\times4\\times4$ satuan disusun dari kubus-kubus satuan, kemudian seluruh permukaan luarnya dicat. Banyak kubus satuan yang tepat memiliki dua sisi bercat adalah …',
        shape: 'kubus',
        options: ['12', '16', '24', '36'],
        answer: 2,
        explanation: 'Kubus satuan dengan tepat dua sisi bercat terletak di sepanjang rusuk (bukan sudut). Banyaknya $=12\\times(n-2)=12\\times(4-2)=24$ buah.'
      },
      {
        id: 'sulit-kubus-selisih-volume',
        text: 'Selisih volume dua kubus yang panjang rusuknya berselisih $3\\text{ cm}$ adalah $513\\text{ cm}^3$. Panjang rusuk kubus yang lebih kecil adalah …',
        shape: 'kubus',
        options: ['$4\\text{ cm}$', '$5\\text{ cm}$', '$6\\text{ cm}$', '$7\\text{ cm}$'],
        answer: 2,
        explanation: 'Misalkan rusuk kecil $=x$, rusuk besar $=x+3$. Maka $(x+3)^3-x^3=513 \\implies 9x^2+27x+27=513 \\implies x^2+3x-54=0 \\implies (x-6)(x+9)=0$. Karena $x>0$, maka $x=6\\text{ cm}$.'
      },
      {
        id: 'sulit-kubus-volume-ke-diagonal',
        text: 'Sebuah kubus memiliki volume $3.375\\text{ cm}^3$. Panjang diagonal ruang kubus tersebut adalah …',
        illustration: 'kubus-diagonal',
        shape: 'kubus',
        options: ['$15\\text{ cm}$', '$15\\sqrt{2}\\text{ cm}$', '$15\\sqrt{3}\\text{ cm}$', '$30\\text{ cm}$'],
        answer: 2,
        explanation: '$s=\\sqrt[3]{3.375}=15\\text{ cm}$ karena $15^3=3.375$. Diagonal ruang $d=s\\sqrt3=15\\sqrt3\\text{ cm}$.'
      },
      {
        id: 'sulit-kubus-tanpa-cat',
        text: 'Kubus besar berukuran $5\\times5\\times5$ satuan disusun dari kubus-kubus satuan, lalu seluruh permukaan luarnya dicat. Banyak kubus satuan yang sama sekali tidak terkena cat (berada di bagian paling dalam) adalah …',
        shape: 'kubus',
        options: ['9', '18', '27', '36'],
        answer: 2,
        explanation: 'Kubus satuan yang tidak terkena cat membentuk kubus berukuran $(n-2)^3=(5-2)^3=3^3=27$ buah.'
      },
      {
        id: 'sulit-balok-diagonal',
        text: 'Panjang, lebar, dan tinggi balok berturut-turut $6\\text{ cm}$, $8\\text{ cm}$, dan $24\\text{ cm}$. Diagonal ruangnya adalah …',
        illustration: 'balok-diagonal',
        shape: 'balok',
        options: ['$24\\text{ cm}$', '$25\\text{ cm}$', '$26\\text{ cm}$', '$28\\text{ cm}$'],
        answer: 2,
        explanation: '$d = \\sqrt{p^2 + l^2 + t^2} = \\sqrt{6^2 + 8^2 + 24^2} = \\sqrt{36 + 64 + 576} = \\sqrt{676} = 26\\text{ cm}$.'
      },
      {
        id: 'sulit-balok-perbandingan',
        text: 'Ukuran balok berbanding $5 : 4 : 3$ dan volumenya $480\\text{ cm}^3$. Luas permukaan balok tersebut adalah …',
        illustration: 'balok-3d',
        shape: 'balok',
        options: ['$336\\text{ cm}^2$', '$352\\text{ cm}^2$', '$376\\text{ cm}^2$', '$400\\text{ cm}^2$'],
        answer: 2,
        explanation: '$5k \\times 4k \\times 3k = 480 \\implies 60k^3 = 480 \\implies k^3 = 8 \\implies k = 2$. Ukuran balok $= 10, 8, 6\\text{ cm}$. $L = 2(80 + 60 + 48) = 376\\text{ cm}^2$.'
      },
      {
        id: 'sulit-balok-tangki',
        text: 'Sebuah tangki berbentuk balok menampung $1{,}44\\text{ m}^3$ air. Jika panjangnya $1{,}2\\text{ m}$ dan lebarnya $0{,}8\\text{ m}$, tinggi tangki adalah …',
        illustration: 'balok-3d',
        shape: 'balok',
        options: ['$0{,}8\\text{ m}$', '$1\\text{ m}$', '$1{,}5\\text{ m}$', '$2\\text{ m}$'],
        answer: 2,
        explanation: '$t = V \\div (p \\times l) = 1{,}44 \\div (1{,}2 \\times 0{,}8) = 1{,}44 \\div 0{,}96 = 1{,}5\\text{ m}$.'
      },
      {
        id: 'sulit-balok-tangki2',
        text: 'Sebuah bak berbentuk balok dengan alas berukuran $2\\text{ m}\\times1{,}5\\text{ m}$ diisi air dengan debit $5$ liter/detik selama $2$ menit. Tinggi air dalam bak tersebut adalah …',
        illustration: 'balok-3d',
        shape: 'balok',
        options: ['$10\\text{ cm}$', '$15\\text{ cm}$', '$20\\text{ cm}$', '$25\\text{ cm}$'],
        answer: 2,
        explanation: 'Volume air $=5\\text{ liter/detik}\\times120\\text{ detik}=600\\text{ liter}=0{,}6\\text{ m}^3$. Tinggi air $=0{,}6\\div(2\\times1{,}5)=0{,}2\\text{ m}=20\\text{ cm}$.'
      },
      {
        id: 'sulit-balok-aljabar-dimensi',
        text: 'Sebuah balok berukuran $x\\text{ cm}\\times(x+1)\\text{ cm}\\times(x+2)\\text{ cm}$. Jika volume balok tersebut $60\\text{ cm}^3$, nilai $x$ adalah …',
        shape: 'balok',
        options: ['2', '3', '4', '5'],
        answer: 1,
        explanation: 'Substitusi $x=3$: $3\\times4\\times5=60$, sesuai dengan volume yang diketahui. Jadi $x=3$.'
      },
      {
        id: 'sulit-balok-jadi-prisma',
        text: 'Sebuah balok dengan panjang $10\\text{ cm}$, lebar $6\\text{ cm}$, dan tinggi $4\\text{ cm}$ dipotong menurut salah satu bidang diagonalnya sehingga terbentuk dua prisma segitiga yang kongruen. Volume salah satu prisma tersebut adalah …',
        illustration: 'balok-3d',
        shape: 'balok',
        options: ['$60\\text{ cm}^3$', '$90\\text{ cm}^3$', '$120\\text{ cm}^3$', '$180\\text{ cm}^3$'],
        answer: 2,
        explanation: 'Volume balok $=10\\times6\\times4=240\\text{ cm}^3$. Karena dipotong menjadi dua prisma segitiga kongruen, volume tiap prisma $=240\\div2=120\\text{ cm}^3$.'
      },
      {
        id: 'sulit-balok-rasio-luas',
        text: 'Sebuah balok memiliki perbandingan panjang, lebar, dan tinggi $5:4:3$. Jika luas permukaan balok tersebut $846\\text{ cm}^2$, volume balok adalah …',
        illustration: 'balok-3d',
        shape: 'balok',
        options: ['$1.080\\text{ cm}^3$', '$1.350\\text{ cm}^3$', '$1.620\\text{ cm}^3$', '$1.944\\text{ cm}^3$'],
        answer: 2,
        explanation: 'Misalkan $p=5k,\\,l=4k,\\,t=3k$. $L=2(20k^2+15k^2+12k^2)=94k^2=846 \\implies k^2=9 \\implies k=3$. Maka $p=15,\\,l=12,\\,t=9$, sehingga $V=15\\times12\\times9=1.620\\text{ cm}^3$.'
      },
      {
        id: 'sulit-balok-kuadrat-dimensi',
        text: 'Sebuah balok memiliki panjang $8\\text{ cm}$, lebar $x\\text{ cm}$, dan tinggi $(x+1)\\text{ cm}$. Jika volume balok tersebut $336\\text{ cm}^3$, nilai $x$ adalah …',
        shape: 'balok',
        options: ['$5\\text{ cm}$', '$6\\text{ cm}$', '$7\\text{ cm}$', '$8\\text{ cm}$'],
        answer: 1,
        explanation: '$8x(x+1)=336 \\implies x^2+x-42=0 \\implies (x-6)(x+7)=0$. Karena $x>0$, maka $x=6\\text{ cm}$.'
      },
      {
        id: 'sulit-balok-diagonal-dari-luas2',
        text: 'Sebuah balok memiliki panjang $9\\text{ cm}$, lebar $12\\text{ cm}$, dan diagonal ruang $17\\text{ cm}$. Tinggi balok tersebut adalah …',
        illustration: 'balok-diagonal',
        shape: 'balok',
        options: ['$6\\text{ cm}$', '$7\\text{ cm}$', '$8\\text{ cm}$', '$9\\text{ cm}$'],
        answer: 2,
        explanation: '$d^2=p^2+l^2+t^2 \\implies 17^2=9^2+12^2+t^2 \\implies 289=81+144+t^2 \\implies t^2=64 \\implies t=8\\text{ cm}$.'
      },
      {
        id: 'sulit-balok-diagonal-alas',
        text: 'Diagonal bidang alas balok $10\\text{ cm}$ dan panjangnya $8\\text{ cm}$. Jika volume balok $480\\text{ cm}^3$, tingginya adalah …',
        illustration: 'balok-3d',
        shape: 'balok',
        options: ['$4\\text{ cm}$', '$6\\text{ cm}$', '$8\\text{ cm}$', '$10\\text{ cm}$'],
        answer: 3,
        explanation: '$\\text{Lebar alas} = \\sqrt{10^2 - 8^2} = \\sqrt{36} = 6\\text{ cm}$. Tinggi $= 480 \\div (8 \\times 6) = 480 \\div 48 = 10\\text{ cm}$.'
      },
      {
        id: 'sulit-prisma-trapesium',
        text: 'Alas prisma berbentuk trapesium dengan sisi sejajar $8\\text{ cm}$ dan $14\\text{ cm}$, tinggi trapesium $4\\text{ cm}$, serta dua sisi lainnya $5\\text{ cm}$. Jika tinggi prisma $10\\text{ cm}$, luas permukaannya …',
        illustration: 'prisma-trapesium',
        shape: 'prisma',
        options: ['$360\\text{ cm}^2$', '$408\\text{ cm}^2$', '$440\\text{ cm}^2$', '$480\\text{ cm}^2$'],
        answer: 1,
        explanation: '$\\text{Luas alas} = \\frac{8 + 14}{2} \\times 4 = 44\\text{ cm}^2$ dan keliling alas $= 8 + 14 + 5 + 5 = 32\\text{ cm}$. Jadi $L = 2(44) + 32(10) = 88 + 320 = 408\\text{ cm}^2$.'
      },
      {
        id: 'sulit-prisma-panjang',
        text: 'Prisma segitiga memiliki alas segitiga siku-siku dengan sisi siku-siku $9\\text{ cm}$ dan $12\\text{ cm}$. Jika volumenya $540\\text{ cm}^3$, panjang prisma adalah …',
        illustration: 'prisma-segitiga',
        shape: 'prisma',
        options: ['$5\\text{ cm}$', '$8\\text{ cm}$', '$10\\text{ cm}$', '$12\\text{ cm}$'],
        answer: 2,
        explanation: '$\\text{Luas alas} = \\frac{1}{2} \\times 9 \\times 12 = 54\\text{ cm}^2$. Panjang prisma $= 540 \\div 54 = 10\\text{ cm}$.'
      },
      {
        id: 'sulit-prisma-segitiga-samakaki',
        text: 'Alas sebuah prisma berbentuk segitiga sama kaki dengan panjang alas $16\\text{ cm}$ dan sisi miring $17\\text{ cm}$. Jika tinggi prisma $20\\text{ cm}$, volume prisma tersebut adalah …',
        illustration: 'prisma-segitiga',
        shape: 'prisma',
        options: ['$1.800\\text{ cm}^3$', '$2.100\\text{ cm}^3$', '$2.400\\text{ cm}^3$', '$2.700\\text{ cm}^3$'],
        answer: 2,
        explanation: 'Tinggi segitiga $=\\sqrt{17^2-8^2}=\\sqrt{289-64}=\\sqrt{225}=15\\text{ cm}$. Luas alas $=\\frac{16\\times15}{2}=120\\text{ cm}^2$. Volume $=120\\times20=2.400\\text{ cm}^3$.'
      },
      {
        id: 'sulit-prisma-dari-balok',
        text: 'Sebuah prisma segitiga siku-siku terbentuk dari separuh balok berukuran $14\\text{ cm}\\times9\\text{ cm}\\times10\\text{ cm}$ yang dipotong menurut diagonal alasnya. Volume prisma tersebut adalah …',
        illustration: 'prisma-segitiga',
        shape: 'prisma',
        options: ['$315\\text{ cm}^3$', '$630\\text{ cm}^3$', '$945\\text{ cm}^3$', '$1.260\\text{ cm}^3$'],
        answer: 1,
        explanation: 'Volume balok $=14\\times9\\times10=1.260\\text{ cm}^3$. Karena prisma terbentuk dari separuh balok, volumenya $=1.260\\div2=630\\text{ cm}^3$.'
      },
      {
        id: 'sulit-prisma-heron',
        text: 'Alas sebuah prisma berbentuk segitiga dengan panjang sisi $13\\text{ cm}$, $14\\text{ cm}$, dan $15\\text{ cm}$. Jika tinggi prisma $20\\text{ cm}$, volume prisma tersebut adalah …',
        illustration: 'prisma-segitiga',
        shape: 'prisma',
        options: ['$1.260\\text{ cm}^3$', '$1.470\\text{ cm}^3$', '$1.680\\text{ cm}^3$', '$1.890\\text{ cm}^3$'],
        answer: 2,
        explanation: 'Dengan rumus Heron, $s=\\frac{13+14+15}{2}=21$, luas alas $=\\sqrt{21(21-13)(21-14)(21-15)}=\\sqrt{21\\times8\\times7\\times6}=\\sqrt{7.056}=84\\text{ cm}^2$. Volume $=84\\times20=1.680\\text{ cm}^3$.'
      },
      {
        id: 'sulit-prisma-aljabar-kaki',
        text: 'Alas sebuah prisma berbentuk segitiga siku-siku dengan panjang kaki $x\\text{ cm}$ dan $(x+7)\\text{ cm}$. Jika tinggi prisma $10\\text{ cm}$ dan volumenya $300\\text{ cm}^3$, nilai $x$ adalah …',
        shape: 'prisma',
        options: ['$4\\text{ cm}$', '$5\\text{ cm}$', '$6\\text{ cm}$', '$8\\text{ cm}$'],
        answer: 1,
        explanation: 'Luas alas $=\\frac12x(x+7)$, sehingga $V=5x(x+7)=300 \\implies x^2+7x-60=0 \\implies (x-5)(x+12)=0$. Karena $x>0$, maka $x=5\\text{ cm}$.'
      },
      {
        id: 'sulit-prisma-trapesium-sisi-lain',
        text: 'Alas sebuah prisma berbentuk trapesium dengan salah satu sisi sejajar $12\\text{ cm}$ dan tinggi trapesium $6\\text{ cm}$. Jika tinggi prisma $15\\text{ cm}$ dan volumenya $1.350\\text{ cm}^3$, panjang sisi sejajar lainnya adalah …',
        illustration: 'prisma-trapesium',
        shape: 'prisma',
        options: ['$14\\text{ cm}$', '$16\\text{ cm}$', '$18\\text{ cm}$', '$20\\text{ cm}$'],
        answer: 2,
        explanation: 'Luas alas $=V\\div t=1.350\\div15=90\\text{ cm}^2$. Karena $\\text{luas alas}=\\frac{(12+b)}{2}\\times6=3(12+b)$, maka $3(12+b)=90 \\implies b=18\\text{ cm}$.'
      },
      {
        id: 'sulit-prisma-skala',
        text: 'Dua prisma sebangun memiliki perbandingan sisi alas dan tinggi $3:5$. Jika volume prisma kecil $54\\text{ cm}^3$, volume prisma besar adalah …',
        shape: 'prisma',
        options: ['$150\\text{ cm}^3$', '$200\\text{ cm}^3$', '$250\\text{ cm}^3$', '$300\\text{ cm}^3$'],
        answer: 2,
        explanation: 'Karena kedua prisma sebangun sepenuhnya, perbandingan volume $=3^3:5^3=27:125$. Volume besar $=\\frac{125}{27}\\times54=250\\text{ cm}^3$.'
      },
      {
        id: 'sulit-prisma-luas-permukaan-siku',
        text: 'Alas prisma berbentuk segitiga siku-siku dengan sisi siku-siku $9\\text{ cm}$ dan $12\\text{ cm}$. Jika tinggi prisma $18\\text{ cm}$, luas permukaan prisma tersebut adalah …',
        illustration: 'prisma-segitiga',
        shape: 'prisma',
        options: ['$648\\text{ cm}^2$', '$702\\text{ cm}^2$', '$756\\text{ cm}^2$', '$810\\text{ cm}^2$'],
        answer: 2,
        explanation: 'Sisi miring $=\\sqrt{9^2+12^2}=\\sqrt{225}=15\\text{ cm}$. Luas alas $=\\frac12\\times9\\times12=54\\text{ cm}^2$, keliling alas $=9+12+15=36\\text{ cm}$. $L=2(54)+36(18)=756\\text{ cm}^2$.'
      },
      {
        id: 'sulit-prisma-tinggi-dari-volume',
        text: 'Alas prisma berbentuk segitiga siku-siku dengan sisi siku-siku $5\\text{ cm}$ dan $12\\text{ cm}$. Jika volume prisma $780\\text{ cm}^3$, tinggi prisma tersebut adalah …',
        illustration: 'prisma-segitiga',
        shape: 'prisma',
        options: ['$18\\text{ cm}$', '$22\\text{ cm}$', '$26\\text{ cm}$', '$30\\text{ cm}$'],
        answer: 2,
        explanation: 'Luas alas $=\\frac12\\times5\\times12=30\\text{ cm}^2$. Tinggi prisma $=V\\div\\text{luas alas}=780\\div30=26\\text{ cm}$.'
      },
      {
        id: 'sulit-limas-luas',
        text: 'Limas segi empat beraturan memiliki sisi alas $12\\text{ cm}$ dan tinggi sisi tegak $10\\text{ cm}$. Luas permukaannya adalah …',
        illustration: 'limas-slant',
        shape: 'limas',
        options: ['$288\\text{ cm}^2$', '$360\\text{ cm}^2$', '$384\\text{ cm}^2$', '$432\\text{ cm}^2$'],
        answer: 2,
        explanation: '$\\text{Luas alas} = 12^2 = 144\\text{ cm}^2$. Luas 4 sisi tegak $= 4 \\times \\left(\\frac{1}{2} \\times 12 \\times 10\\right) = 240\\text{ cm}^2$. Total $L = 144 + 240 = 384\\text{ cm}^2$.'
      },
      {
        id: 'sulit-limas-tinggi',
        text: 'Sebuah limas beralas persegi memiliki tinggi sisi tegak $13\\text{ cm}$ dan sisi alas $10\\text{ cm}$. Tinggi limas tersebut …',
        illustration: 'limas-slant',
        shape: 'limas',
        options: ['$11\\text{ cm}$', '$12\\text{ cm}$', '$13\\text{ cm}$', '$14\\text{ cm}$'],
        answer: 1,
        explanation: 'Tinggi limas $=\\sqrt{t_{\\text{sisi}}^2-(\\frac{s}{2})^2}=\\sqrt{13^2-5^2}=\\sqrt{169-25}=\\sqrt{144}=12\\text{ cm}$.'
      },
      {
        id: 'sulit-limas-slant-dari-tinggi',
        text: 'Sebuah limas segiempat beraturan memiliki tinggi $12\\text{ cm}$ dan panjang sisi alas $10\\text{ cm}$. Tinggi sisi tegak (apotema) limas tersebut adalah …',
        illustration: 'limas-slant',
        shape: 'limas',
        options: ['$11\\text{ cm}$', '$12\\text{ cm}$', '$13\\text{ cm}$', '$14\\text{ cm}$'],
        answer: 2,
        explanation: 'Tinggi sisi tegak $=\\sqrt{t^2+(\\frac{s}{2})^2}=\\sqrt{12^2+5^2}=\\sqrt{144+25}=\\sqrt{169}=13\\text{ cm}$.'
      },
      {
        id: 'sulit-limas-volume-dari-slant',
        text: 'Sebuah limas segiempat beraturan memiliki sisi alas $16\\text{ cm}$ dan tinggi sisi tegak $17\\text{ cm}$. Volume limas tersebut adalah …',
        illustration: 'limas-3d',
        shape: 'limas',
        options: ['$960\\text{ cm}^3$', '$1.120\\text{ cm}^3$', '$1.280\\text{ cm}^3$', '$1.536\\text{ cm}^3$'],
        answer: 2,
        explanation: 'Tinggi limas $=\\sqrt{17^2-8^2}=\\sqrt{225}=15\\text{ cm}$. Luas alas $=16^2=256\\text{ cm}^2$. Volume $=\\frac13\\times256\\times15=1.280\\text{ cm}^3$.'
      },
      {
        id: 'sulit-limas-skala-gabungan',
        text: 'Sebuah limas memiliki volume $20\\text{ cm}^3$. Jika panjang sisi alas diperbesar menjadi 3 kali dan tinggi diperbesar menjadi 2 kali semula, volume limas yang baru adalah …',
        shape: 'limas',
        options: ['$180\\text{ cm}^3$', '$240\\text{ cm}^3$', '$360\\text{ cm}^3$', '$540\\text{ cm}^3$'],
        answer: 2,
        explanation: 'Karena $V=\\frac13s^2t$, jika sisi alas menjadi $3s$ dan tinggi menjadi $2t$, volume menjadi $3^2\\times2=18$ kali semula. Volume baru $=18\\times20=360\\text{ cm}^3$.'
      },
      {
        id: 'sulit-limas-frustum',
        text: 'Sebuah limas segiempat beraturan tingginya $12\\text{ cm}$ dan volumenya $810\\text{ cm}^3$. Limas tersebut dipotong oleh bidang sejajar alas pada ketinggian $4\\text{ cm}$ dari puncak, membentuk limas kecil yang sebangun dengan limas semula. Volume bagian bawah (frustum) yang terbentuk adalah …',
        shape: 'limas',
        options: ['$690\\text{ cm}^3$', '$750\\text{ cm}^3$', '$780\\text{ cm}^3$', '$800\\text{ cm}^3$'],
        answer: 2,
        explanation: 'Perbandingan tinggi $4:12=1:3$, sehingga perbandingan volume $=1^3:3^3=1:27$. Volume limas kecil $=\\frac{1}{27}\\times810=30\\text{ cm}^3$. Volume frustum $=810-30=780\\text{ cm}^3$.'
      },
      {
        id: 'sulit-limas-aljabar-volume',
        text: 'Sebuah limas beralas persegi memiliki sisi alas $x\\text{ cm}$ dan tinggi $(x+2)\\text{ cm}$. Jika volume limas tersebut $32\\text{ cm}^3$, nilai $x$ adalah …',
        shape: 'limas',
        options: ['$3\\text{ cm}$', '$4\\text{ cm}$', '$5\\text{ cm}$', '$6\\text{ cm}$'],
        answer: 1,
        explanation: '$V=\\frac13x^2(x+2)=32 \\implies x^2(x+2)=96$. Untuk $x=4$: $16\\times6=96$, sesuai. Jadi $x=4\\text{ cm}$.'
      },
      {
        id: 'sulit-limas-belah-ketupat',
        text: 'Sebuah limas memiliki alas berbentuk belah ketupat dengan panjang diagonal $16\\text{ cm}$ dan $12\\text{ cm}$. Jika tinggi limas $15\\text{ cm}$, volume limas tersebut adalah …',
        shape: 'limas',
        options: ['$320\\text{ cm}^3$', '$400\\text{ cm}^3$', '$480\\text{ cm}^3$', '$576\\text{ cm}^3$'],
        answer: 2,
        explanation: 'Luas alas belah ketupat $=\\frac{d_1\\times d_2}{2}=\\frac{16\\times12}{2}=96\\text{ cm}^2$. Volume $=\\frac13\\times96\\times15=480\\text{ cm}^3$.'
      },
      {
        id: 'sulit-limas-sisi-dari-luas',
        text: 'Sebuah limas segiempat beraturan memiliki tinggi sisi tegak $13\\text{ cm}$ dan luas permukaan $560\\text{ cm}^2$. Panjang sisi alas limas tersebut adalah …',
        illustration: 'limas-slant',
        shape: 'limas',
        options: ['$12\\text{ cm}$', '$13\\text{ cm}$', '$14\\text{ cm}$', '$16\\text{ cm}$'],
        answer: 2,
        explanation: 'Misalkan sisi alas $=s$. $L=s^2+26s=560 \\implies s^2+26s-560=0$. Dengan rumus kuadrat, $s=\\frac{-26+\\sqrt{26^2+4(560)}}{2}=\\frac{-26+54}{2}=14\\text{ cm}$.'
      },
      {
        id: 'sulit-limas-volume-alas-segitiga',
        text: 'Sebuah limas memiliki alas berbentuk segitiga siku-siku dengan sisi siku-siku $9\\text{ cm}$ dan $12\\text{ cm}$. Jika tinggi limas $20\\text{ cm}$, volume limas tersebut adalah …',
        illustration: 'limas-3d',
        shape: 'limas',
        options: ['$270\\text{ cm}^3$', '$300\\text{ cm}^3$', '$360\\text{ cm}^3$', '$432\\text{ cm}^3$'],
        answer: 2,
        explanation: 'Luas alas $=\\frac12\\times9\\times12=54\\text{ cm}^2$. Volume $=\\frac13\\times54\\times20=360\\text{ cm}^3$.'
      }
    ]
  };

  const levels = Object.freeze({
    mudah: { label: 'Mudah', seconds: 60, description: 'Konsep dasar dan hitungan satu langkah' },
    sedang: { label: 'Sedang', seconds: 90, description: 'Rumus dan hitungan bertahap' },
    sulit: { label: 'Sulit', seconds: 120, description: 'Analisis dan gabungan beberapa konsep' }
  });

  const shapes = Object.freeze({
    semua: { label: 'Semua Bangun', illustration: 'icon-semua' },
    kubus: { label: 'Kubus', illustration: 'icon-kubus' },
    balok: { label: 'Balok', illustration: 'icon-balok' },
    prisma: { label: 'Prisma', illustration: 'icon-prisma' },
    limas: { label: 'Limas', illustration: 'icon-limas' }
  });

  root.FROG_QUESTIONS = questions;
  root.FROG_LEVELS = levels;
  root.FROG_SHAPES = shapes;
  if (typeof module !== 'undefined' && module.exports) module.exports = { questions, levels, shapes };
})(typeof window !== 'undefined' ? window : globalThis);
