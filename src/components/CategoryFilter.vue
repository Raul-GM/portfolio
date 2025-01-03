<template>
    <div class="category-filter">
      <button
        class="category-filter_button"
        v-for="category in allCategories"
        :key="category"
        :class="{ active: selectedCategories.includes(category) }"
        @click="toggleCategory(category)"
      >
        {{ category }}
      </button>
    </div>
  </template>
  
  <script>
  import { Categories } from './../views/data/categories.js';
  export default {
    data() {
      return {
        ALL_CATEGORIES: 'Todos',
        selectedCategories: ['Todos'],
      };
    },
    computed: {
      allCategories() {
        return [this.ALL_CATEGORIES, ...Object.values(Categories)];
      },
    },
    methods: {
      toggleCategory(category) {
        if (category === this.ALL_CATEGORIES) {
          this.selectedCategories = [this.ALL_CATEGORIES];
        } else {
          const index = this.selectedCategories.indexOf(category);
          if (index === -1) {
            this.selectedCategories.push(category);
            this.selectedCategories = this.selectedCategories.filter(cat => cat !== 'Todos');
          } else {
            this.selectedCategories.splice(index, 1);
            if (this.selectedCategories.length === 0) {
              this.selectedCategories = [this.ALL_CATEGORIES];
            }
          }
        }
        this.$emit('update-filter', this.selectedCategories);
      },
    },
  };
  </script>
  
  <style lang="scss">
  @import './../assets/styles/_media-variables.scss';
  
  .category-filter {
    display: flex;
    gap: .5rem;
    flex-wrap: wrap;
    padding: 0 1rem 1rem 1rem;
    @media (min-width: $media-mobile) {
      padding: 1rem var(--main-padding) 0;
    }
    &_button {
      background-color: var(--secondary-text-color);
      border: none;
      padding: .25rem .5rem;
      @media (min-width: $media-mobile) {
        padding: .5rem 1rem;
      }
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease; 
      &.active {
        background-color: var(--secondary-color);
        color: var(--secondary-text-color);
      }
      &:hover {
        background-color: var(--primary-color);
        color: var(--secondary-text-color);
      }
    }
  }
  </style>
