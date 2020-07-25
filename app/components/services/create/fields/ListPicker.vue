<template>

  <StackLayout class="main-create-field" orientation="vertical">
    <Label class="main-create-field-label" :text="`Варианты выбора: ${items.length} из 10.`" />
    <FlexboxLayout class="main-create-field-flex" margin="15 0">
      <TextField class="main-create-field-text" flexGrow="1" editable="true" hint="Вариант" v-model="newItem" />
      <Button class="main-create-field-button" text="+" @tap="addItem" />
    </FlexboxLayout>
    <FlexboxLayout v-for="(item, index) in items" class="main-create-field-flex" :key="index">
      <Label class="main-create-field-label" flexGrow="1" :text="item" />
      <Button class="main-create-field-button" text="-" @tap="deleteItem(index)" />
    </FlexboxLayout>
  </StackLayout>

</template>

<script>

export default {
  data() {
    setTimeout(this.updateErrors, 0);
    return {
      items: Array(),
      newItem: ''
    }
  },
  methods: {
    addItem() {
      setTimeout(this.updateErrors, 0);

      if (this.newItem.length === 0) {
        alert('Введите вариант.');
        return;
      }

      if (this.items.length === 10) {
        alert('Достигнуто максимальное количество вариантов.');
      }

      if (this.hasItem(this.newItem)) {
        alert('Такой вариант уже есть.');
        return;
      }

      this.items.push(this.newItem);
    },
    deleteItem(index) {
      setTimeout(this.updateErrors, 0);

      let newItems = Array();

      for (let i = 0; i < index; i += 1)
        newItems.push(this.items[i]);

      for (let i = index + 1; i < this.items.length; i += 1)
        newItems.push(this.items[i]);

      this.items = newItems;
    },
    hasItem(item) {
      for (let i = 0; i < this.items.length; i += 1)
        if (this.items[i] === item)
          return true;

      return false;
    },
    updateErrors() {
      let errors = Array(),
          fieldValid = true;

      if (this.items.length === 0) {
        errors.push('Заполните варианты поля.');
        fieldValid = false;
      }

      if (fieldValid) {
        this.$emit('news', {
          field: {
            type: 'list',
            items: this.items
          }
        });
      } else {
        this.$emit('news', {
          errors
        });
      }
    }
  }
}

</script>