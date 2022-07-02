import { defineStore } from "pinia";
import axios from "axios";
export const useBookStore = defineStore("bookStore", {
  state: () => ({
    counter: 0,
    book: {},
    loadingBooks: false,
    loadingBook: false,
    books: {
      data: [
        {
          id: 27,
          book_name: "Hello World, Forgiveness of Sins",
          book_details: "hjbkbj",
          author: "uhu",
          book_key: "57a8f4a38ec2e20f4430548c1497bce2",
          short_url: "iubu-2116008587",
          uploaded_by: "Oba John",
          youtube_url: "https://www.youtube.com/watch?v=t1Qxu_bfFzQ",
          short_details: "bjkjk",
          year: "",
          popular: 0,
          created_at: "2022-04-24 00:34:06",
          updated_at: "2022-04-26 08:53:35",
          tracks: [
            {
              file_url:
                "https://shekinah.s3.af-south-1.amazonaws.com/iubu-uhu50.mp3",
              file_bytes: 3330755,
            },
          ],
          images: ["uploads/images/202204260951521508975530.jpeg"],
          comments: [],
          deleting: false,
        },
      ],
      meta: {
        current_page: 1,
        total_pages: 1,
      },
    },
  }),

  getters: {
    Books(state) {
      return state.books;
    },
    getBook(state) {
      return state.book;
    },
  },

  actions: {
    async fetchBooks(page = 1) {
      try {
        this.setLoadingBooks();
        await axios.get(`/book/pages/${page}`).then((response) => {
          this.books = response.data;
          console.log(response.data);
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.setLoadingBooks();
      }
    },
    setLoadingBooks() {
      this.loadingBooks = !this.loadingBooks;
    },
    async fetchBookByUrl(short_url) {
      try {
        this.setLoadingBook();
        await axios.get(`/book/url/${short_url}`).then((response) => {
          this.book = response.data;
          console.log(response.data);
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.setLoadingBook();
      }
    },
    setLoadingBook() {
      this.loadingBook = !this.loadingBook;
    },
  },
});
