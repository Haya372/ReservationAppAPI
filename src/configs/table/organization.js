export default {
  organization_id: {
    text: 'id'
  },
  organization_name: {
    text: "団体名",
    link: true
  },
  role: {
    text: "権限",
    component: 'arraytext',
    props: {
      join: ', '
    }
  },
  organization_description: {
    text: "説明"
  }
}