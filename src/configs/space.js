export default {
  name: {
    size: 12,
    required: true,
    component: 'text',
    props: {
      fullWidth: true,
      notNull: true,
      label: "場所名"
    }
  },
  capacity: {
    size: 12,
    required: true,
    component: 'number',
    props: {
      min: '0',
      label: '最大人数',
    }
  }
}