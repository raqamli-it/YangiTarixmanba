export const endpoints = {
  news: "/api/news/",
  newsById: (id) => `api/news/${id}/`,
  libraryCategory: "/api/library-categories/",
  libraryCategoryById: (id) => `api/library-categories/${id}/`,
  categoryApi_list: "/api/category_api-list/", /// homdagi card carusellar
  // categoryApi_listById: (id) => `/api/category_api-detail/${id}/`,
  // resursApi_list: "/api/resource_api-list/",
  categoryResourceApi: "/api/category-resource/", /// headerdagi manbalar categoriyasi
  categoryResourceApiById: (id) => `/api/category-resource/${id}`,
  categoryResourceDetailById: (id) => `/api/resource_api-detail/${id}/`,
  locationApiById: (id) => `/api/categories/${id}/locations/`,
  register: `/user/register/`,
  period_filter: `/period_filter/`,
  slider: `/api/sliders/`,
};
