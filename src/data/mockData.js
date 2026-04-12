/**
 * Mock invitation data based on the API response from abaGroomn.id
 * This will be replaced with actual API calls in production
 */
export const mockInvitationData = {
  id: "5c11a770-818d-4c78-8965-5751574f3432",
  slug: "Groom-Bride-jawa",
  status: "PUBLISHED",
  gift_type: "manual",
  groom: {
    url: "/assets/images/groom.jpg",
    name: "Groom",
    nickname: "Groom",
    description: "Putra pertama dari Bapak Groom dan Ibu Groom",
    instagram_username: "groom"
  },
  bride: {
    url: "/assets/images/bride.jpg",
    name: "Bride",
    nickname: "Bride",
    description: "Bride dari Bapak Bride dan Ibu Bride",
    instagram_username: "bride"
  },
  events: [
    {
      id: "evt_1bd5e4754468",
      show_on_rsvp: true,
      date: "2026-12-31",
      time_start: "19:00",
      time_end: "21:00",
      name: "Resepsi",
      venue: {
        url: "https://share.google/e7ZrKSTtQ6zzxgOpT",
        name: "Ballroom Shangri-La Hotel Jakarta",
        image: "/assets/images/venue.webp",
        address: "Jl. Jenderal Sudirman No.Kav. 1, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10220"
      }
    }
  ],
  quote: '"Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram di sampingnya, dan dijaGroomn-Nya di antaramu rasa kasih dan sayang."\n\n— Ar-Rum: 21',
  gallery: [
    { key: "gallery", url: "/assets/images/galleries/prewedd-1.webp", label: "Gallery 1", ratio: { width: 16, height: 9 } },
    { key: "gallery", url: "/assets/images/galleries/prewedd-2.webp", label: "Gallery 2", ratio: { width: 3, height: 4 } },
    { key: "gallery", url: "/assets/images/galleries/prewedd-3.webp", label: "Gallery 3", ratio: { width: 3, height: 4 } },
    { key: "gallery", url: "/assets/images/galleries/prewedd-4.webp", label: "Gallery 4", ratio: { width: 3, height: 4 } },
    { key: "gallery", url: "/assets/images/galleries/prewedd-5.webp", label: "Gallery 5", ratio: { width: 3, height: 4 } }
  ],
  // love_story: [
  //   {
  //     image: "https://os.abaGroomn.id/invitation-images/love-story/599c6154-f8e7-4bc9-aa4d-bff2b53b1201/dc21daa9-89b3-4048-a407-b19dd4aefc9c.jpg",
  //     title: "Agustus 2019 – Awal yang Tak Disangka",
  //     description: "Tanpa pernah direncanakan, langkah kami dipertemukan di ruang kelas dan diskusi kelompok. Dari obrolan ringan yang sederhana, tumbuh rasa ingin tahu yang perlahan menjelma menjadi perhatian."
  //   },
  //   {
  //     image: "https://os.abaGroomn.id/invitation-images/love-story/599c6154-f8e7-4bc9-aa4d-bff2b53b1201/a28ac245-2761-4b5c-89a9-a731b90afec7.jpg",
  //     title: "2020 – Tahun Ujian & Pembuktian",
  //     description: "Tahun penuh tantangan—jarak, kesibukan, dan perbedaan sempat mengetuk pintu hubungan kami. Namun justru di sanalah kami belajar, bahwa cinta bukan hanya tentang tawa."
  //   },
  //   {
  //     image: "https://os.abaGroomn.id/invitation-images/love-story/599c6154-f8e7-4bc9-aa4d-bff2b53b1201/d62658a1-4cbe-4ad7-9d2c-f2b1bf969670.jpg",
  //     title: "2021 – Saling Tumbuh, Saling Yakin",
  //     description: "Kami berhenti meragu dan mulai percaya bahwa perjalanan ini layak diperjuangkan. Dengan segala perbedaan, kami menemukan irama untuk tumbuh bersama."
  //   },
  //   {
  //     image: "https://os.abaGroomn.id/invitation-images/love-story/599c6154-f8e7-4bc9-aa4d-bff2b53b1201/2ba83221-e5c6-41b9-8c50-d16d72cbfdad.jpg",
  //     title: "2022 – Menenun Mimpi Bersama",
  //     description: "Setiap percakapan berubah menjadi rencana, setiap langkah menjadi pondasi. Kami mulai menenun mimpi yang bukan lagi milikku atau miliknya, melainkan milik 'kita'."
  //   },
  //   {
  //     image: "https://os.abaGroomn.id/invitation-images/love-story/599c6154-f8e7-4bc9-aa4d-bff2b53b1201/cdb94cbc-bc7e-43f8-a7aa-d3029723a548.jpg",
  //     title: "2023 – Keyakinan yang Mantap",
  //     description: "Waktu berjalan, rasa ini semakin teguh. Kami menyadari bahwa bukan lagi soal mencari siapa yang sempurna, tapi bagaimana kami saling melengkapi kekurangan."
  //   }
  // ],
  // dresscode: [
  //   { name: "Biru Langit", color_hex: "#4DABF7", description: "Warna yang melambangkan ketenangan dan kedamaian" },
  //   { name: "Biru Muda", color_hex: "#74C0FC", description: "Warna yang memberikan kesan fresh dan modern" },
  //   { name: "Biru Pastel", color_hex: "#A5D8FF", description: "Warna lembut yang cocok untuk suasana santai" }
  // ],
  gifts: [
    {
      id: "2e9d47a0-a794-4153-b476-010f3f97b19f",
      account_name: "Faizal",
      account_number: "123123123",
      bank: {
        name: "Bank Mandiri",
        code: "ID_MANDIRI",
        logo: "/assets/images/bank/mandiri.webp"
      }
    },
    {
      id: "8ed2f59b-1539-482e-909f-4ad40d1475f2",
      account_name: "Faizal",
      account_number: "123123123",
      bank: {
        name: "Bank Central Asia (BCA)",
        code: "ID_BCA",
        logo: "/assets/images/bank/bca.webp"
      }
    }
  ],
  messages: [
    { 
      id: "1", 
      message: "Selamat menempuh hidup baru! Semoga bahagia selalu 💕", 
      guest_book: { name: "Rizky & Michelle", code: "EXI54K" }, 
      created_at: "2026-01-31T09:58:01.539Z" 
    },
    { 
      id: "2", 
      message: "Cheers to love, laughter, and happily ever after! So happy for you both, Groom & Bride!", 
      guest_book: { name: "Daniel", code: "ABC123" }, 
      created_at: "2025-12-30T06:52:06.642Z" 
    },
    { 
      id: "3", 
      message: "A new chapter begins! Semoga cinta kalian tumbuh setiap hari, Groom & Bride.", 
      guest_book: { name: "William", code: "DEF456" }, 
      created_at: "2025-12-30T06:51:40.039Z" 
    },
    { 
      id: "4", 
      message: "Barakallahu lakuma wa baraka 'alaikuma 🤲", 
      guest_book: { name: "Sarah", code: "GHI789" }, 
      created_at: "2025-12-09T13:47:10.922Z" 
    },
    { 
      id: "5", 
      message: "Waah akhirnya! Semoga jadi keluarga sakinah mawaddah warahmah 🕊️", 
      guest_book: { name: "Ahmad", code: "JKL012" }, 
      created_at: "2025-12-06T15:51:34.125Z" 
    }
  ],
  guest_book: {
    id: "259eef09-bf74-4d5f-9ef3-14ce72aa380e",
    code: "EXI54K",
    name: "Faizal & Partner",
    response: "ACCEPT",
    quota: 1,
    greetings: "Dear"
  },
  date: "2026-12-31T00:00:00.000Z",
  template_variant: {
    name: "Jawa",
    value: {
      intro: {
        title: {
          prefix: "The Wedding of"
        },
        background_url: "/assets/images/loadingscreen-raw.webp",
        button: {
          default_image: "/assets/images/button-loading-screen.webp"
        }
      },
      preloader: {
        background_url: "/assets/preloader/preloader-screen.webp",
        decorations: [
          { id: "giftbox-xl", image_url: "/assets/preloader/preloader-giftbox-xl-2.webp", position_class: "top-left" },
          { id: "giftbox-sm", image_url: "/assets/preloader/preloader-giftbox-sm-2.webp", position_class: "bottom-right" },
          { id: "love-xl", image_url: "/assets/preloader/preloader-love-xl.webp", position_class: "top-right" },
          { id: "love-sm", image_url: "/assets/preloader/preloader-love-sm.webp", position_class: "bottom-left" }
        ],
        main_indicator: {
          image_url: "/assets/preloader/preloader-image.webp",
          animation_class: "pendulum"
        },
        text_indicator: {
          image_url: "/assets/preloader/preloader-indicator-text.webp"
        }
      },
      ui_text: {
        bride_groom: {
          bride_label: "The Bride",
          groom_label: "The Groom",
          description: "Dua pribadi yang berbeda, tapi saling melengkapi dalam satu cerita"
        },
        gallery: {
          description: "Kumpulan momen indah perjalanan cinta kami yang ingin kami bagikan."
        },
        love_story: {
          description: "Cerita kami, dari yang tak sengaja… hingga jadi selamanya"
        },
        location: {
          description: "Temui kami di hari paling berharga dalam hidup kami",
          countdown_days: "Hari",
          countdown_hours: "Jam",
          countdown_minutes: "Menit",
          countdown_seconds: "Detik",
          countdown_title: "Hitung Mundur Menuju Hari Bahagia",
          view_map_button: "Buka di Google Maps"
        },
        dresscode: {
          intro_text: "Kami akan sangat senang jika tamu undangan mengenakan pakaian dengan warna yang serasi untuk melengkapi tema pernikahan kami.",
          color_label: "Warna yang Disarankan"
        },
        rsvp: {
          description: "Mohon konfirmasi kehadiran Anda dengan mengisi form di bawah ini.",
          will_attend: "Hadir",
          wont_attend: "Tidak Hadir",
          submit_button: "Kirim Konfirmasi",
          name_placeholder: "Nama Lengkap",
          phone_placeholder: "Nomor Telepon",
          message_placeholder: "Tulis ucapan atau doa untuk kami...",
          attendance_label: "Kehadiran",
          guest_count_label: "Jumlah Tamu",
          guest_count_suffix: "Orang",
          success_message: "Terima kasih! Konfirmasi Anda telah diterima."
        },
        gift: {
          thank_you: "Terima kasih atas doa dan perhatianmu, kehadiranmu sudah lebih dari cukup bagi kami.",
          tab_amplop: "Amplop Digital",
          copied_text: "Nomor rekening berhasil disalin!",
          copy_button: "Salin Rekening",
          description: "Bagi keluarga dan sahabat yang ingin mengirimkan tanda kasih, kami menyediakan fitur amplop digital sebagai bentuk kemudahan.",
          account_name_label: "a.n."
        },
        live_chat: {
          button_text: {
            hide_messages: "Sembunyikan Ucapan",
            show_messages: "Lihat Ucapan",
            confirm_attendance: "Konfirmasi Kehadiran"
          }
        },
        welcome: {
          title: "Selamat Datang di Ruangan Interaktif! 🎉",
          intro_text: "Klik elemen-elemen di dalam ruangan ini untuk menemukan kejutan dan informasi penting seputar hari istimewa kami."
        }
      },
      navigation: {
        qr_code: { visible: true },
        info_button: { visible: true },
        button_color: "#FB8A9C",
        toggle_light: { visible: true },
        toggle_music: { visible: true }
      },
      decorations: [
        {
          id: "bride-groom",
          name: "Tentang Kami",
          position: { top: "29%", left: "35%" },
          size: { width: "25%", maxWidth: "25%" },
          image_url: "/assets/images/about-us.webp",
          modal_type: "bride-groom",
          description: "Lihat momen spesial kami sebagai pasangan yang sedang berbahagia.",
          zIndex: 20,
          animations: { hover: true, breath: true }
        },
        // {
        //   id: "dresscode",
        //   name: "Busana & Nuansa",
        //   position: { top: "32%", right: "20%" },
        //   size: { width: "17%", maxWidth: "17%" },
        //   image_url: "/assets/images/dresscode.webp",
        //   modal_type: "dresscode",
        //   description: "Kenali warna pilihan kami agar kamu bisa tampil serasi di hari istimewa.",
        //   zIndex: 20,
        //   animations: { hover: true, breath: true }
        // },
        // {
        //   id: "love-story",
        //   name: "Kisah Cinta Kami",
        //   position: { top: "0", left: "41%" },
        //   size: { width: "15%", maxWidth: "15%" },
        //   image_url: "/assets/images/love-story.webp",
        //   modal_type: "love-story",
        //   description: "Ikuti kisah kami dari pertemuan pertama hingga jadi satu tujuan.",
        //   zIndex: 20,
        //   animations: { hover: true, breath: true }
        // },
        {
          id: "gallery-book",
          name: "Galeri Cerita Kami",
          position: { top: "25%", left: "12%" },
          size: { width: "20%", maxWidth: "20%" },
          image_url: "/assets/images/gallery.webp",
          modal_type: "gallery-book",
          description: "Lihat momen kebersamaan kami yang penuh warna dan cerita.",
          zIndex: 21,
          animations: { hover: true, breath: true }
        },
        {
          id: "location",
          name: "Waktu & Tempat",
          position: { top: "16%", right: "17%" },
          size: { width: "23%", maxWidth: "23%" },
          image_url: "/assets/images/date-venue.webp",
          modal_type: "location",
          description: "Lihat lokasi akad dan resepsi lengkap dengan petunjuk arah ke tempat acara.",
          zIndex: 20,
          animations: { hover: true, breath: true }
        },
        {
          id: "guestbook",
          name: "Konfirmasi Kehadiran",
          position: { top: "48%", right: "13%" },
          size: { width: "22%", maxWidth: "22%" },
          image_url: "/assets/images/rsvp.webp",
          modal_type: "guestbook",
          description: "Tinggalkan pesan atau doa hangat untuk kami berdua.",
          zIndex: 20,
          animations: { hover: true, breath: true }
        },
        {
          id: "giftbox",
          name: "Kado & Doa dari Jauh",
          position: { right: "1%", bottom: "2%" },
          size: { width: "25%", maxWidth: "25%" },
          image_url: "/assets/images/gift.webp",
          modal_type: "giftbox",
          description: "Kirim hadiah atau dukungan dari jauh dengan penuh cinta.",
          zIndex: 20,
          animations: { hover: true, breath: true }
        }
      ],
      main_content: {
        background_url: "/assets/images/background.webp"
      }
    }
  },
  music: {
    title: "Take My Hand (The Wedding Song)",
    channel_name: "Emily Hackett",
    year: "2016"
  }
}
