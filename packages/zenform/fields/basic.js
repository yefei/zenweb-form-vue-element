export default function () {
  return {
    props: ['field', 'value'],
    methods: {
      input(value) {
        this.$emit('input', value);
      }
    }
  }
}