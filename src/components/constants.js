export const SECTION_INFO = [
  {
    id: "personalInfo",
    title: "Личная информация",
    deletable: false,
    values: {
      Name: "Имя и фамилия",
      jobName: "Название Должности",
      location: "Страна, город"
    }
  },
  {
    id: "contactInfo",
    title: "Контактная информация",
    deletable: false,
    values: {
      email: "Email",
      phone: "Номер телефона"
    }
  },
  {
    id: "education",
    title: "Образование",
    deletable: true,
    values: {
      institution: "Организация",
      specialization: "Специальность",
      educationPeriod: "Период обучения"
    }
  },
  {
    id: "experience",
    title: "Опыт работы",
    deletable: true,
    values: {
      company: "Компания",
      position: "Должность",
      workPeriod: "Период работы",
      description: "Описание"
    }
  },
  {
    id: "skills",
    title: "Навыки",
    deletable: true,
    values: {
      skillsName: "Навыки"
    }
  },
  { id: "about", deletable: true, title: "О себе", values: { about: "О себе" } }
];
export const MOCK_SECTION_VALUES = {
  personalInfo: {
    jobName: "Frontend Developer",
    location: "Москва, Россия",
    Name: "Иван Иванов"
  },
  contactInfo: {
    email: "ivan.ivanov@example.com",
    phone: "+7 (999) 123-45-67"
  },
  education: {
    institution: "МГУ им. М.В. Ломоносова",
    specialization: "Прикладная математика",
    educationPeriod: "2016 — 2020"
  },
  experience: {
    company: "ООО «ТехСофт»",
    position: "Frontend Developer",
    workPeriod: "2021 — 2024",
    description:
      "Разработка и поддержка SPA на React, внедрение UI-библиотек, оптимизация производительности."
  },
  skills: {
    skillsName: "JavaScript, React, Redux, HTML, CSS, Git"
  },
  about: {
    about:
      "Ответственный, быстро обучаюсь, люблю командную работу и новые технологии."
  }
};
