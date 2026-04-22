migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('projects')
    col.fields.add(new TextField({ name: 'specific_impact' }))
    col.fields.add(new TextField({ name: 'ambition' }))
    col.fields.add(new DateField({ name: 'target_completion' }))
    col.fields.add(new TextField({ name: 'budget_allocation' }))
    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('projects')
    col.fields.removeByName('specific_impact')
    col.fields.removeByName('ambition')
    col.fields.removeByName('target_completion')
    col.fields.removeByName('budget_allocation')
    app.save(col)
  },
)
