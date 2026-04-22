migrate(
  (app) => {
    // 1. Objectives
    const objectives = new Collection({
      name: 'objectives',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'text' },
        {
          name: 'type',
          type: 'select',
          required: true,
          values: ['breakthrough', 'annual'],
          maxSelect: 1,
        },
        { name: 'horizon', type: 'text' },
        {
          name: 'status',
          type: 'select',
          required: true,
          values: ['on_track', 'at_risk', 'completed'],
          maxSelect: 1,
        },
        { name: 'progress', type: 'number', min: 0, max: 100 },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(objectives)

    // 2. KPIs
    const kpis = new Collection({
      name: 'kpis',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'current_value', type: 'number' },
        { name: 'target_value', type: 'number' },
        { name: 'unit', type: 'text' },
        {
          name: 'objective_id',
          type: 'relation',
          collectionId: objectives.id,
          cascadeDelete: false,
          maxSelect: 1,
        },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(kpis)

    // Add self-referencing parent_kpi
    kpis.fields.add(new RelationField({ name: 'parent_kpi', collectionId: kpis.id, maxSelect: 1 }))
    app.save(kpis)

    // 3. Projects
    const projects = new Collection({
      name: 'projects',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'problem_statement', type: 'text' },
        { name: 'goal_statement', type: 'text' },
        { name: 'status', type: 'select', values: ['draft', 'active', 'completed'], maxSelect: 1 },
        {
          name: 'objective_id',
          type: 'relation',
          collectionId: objectives.id,
          cascadeDelete: false,
          maxSelect: 1,
        },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(projects)

    // 4. PDCA Tasks
    const pdca_tasks = new Collection({
      name: 'pdca_tasks',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'stage',
          type: 'select',
          required: true,
          values: ['plan', 'do', 'check', 'act'],
          maxSelect: 1,
        },
        { name: 'priority', type: 'select', values: ['low', 'medium', 'high'], maxSelect: 1 },
        {
          name: 'project_id',
          type: 'relation',
          collectionId: projects.id,
          cascadeDelete: true,
          maxSelect: 1,
        },
        {
          name: 'owner_id',
          type: 'relation',
          collectionId: '_pb_users_auth_',
          cascadeDelete: false,
          maxSelect: 1,
        },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(pdca_tasks)

    // 5. Activities
    const activities = new Collection({
      name: 'activities',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        {
          name: 'user_id',
          type: 'relation',
          collectionId: '_pb_users_auth_',
          cascadeDelete: true,
          maxSelect: 1,
        },
        { name: 'content', type: 'text', required: true },
        { name: 'type', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(activities)
  },
  (app) => {
    const collections = ['activities', 'pdca_tasks', 'projects', 'kpis', 'objectives']
    for (const name of collections) {
      try {
        const col = app.findCollectionByNameOrId(name)
        app.delete(col)
      } catch (_) {}
    }
  },
)
