import pb from '@/lib/pocketbase/client'

export const getObjectives = () => pb.collection('objectives').getFullList({ sort: '-created' })

export const getKpis = () => pb.collection('kpis').getFullList({ sort: '-created' })

export const getProjects = () =>
  pb.collection('projects').getFullList({ expand: 'objective_id', sort: '-created' })

export const getProject = (id: string) =>
  pb.collection('projects').getOne(id, { expand: 'objective_id' })

export const getProjectTasks = (projectId: string) =>
  pb.collection('pdca_tasks').getFullList({
    filter: `project_id = "${projectId}"`,
    expand: 'owner_id,project_id',
    sort: 'created',
  })

export const getTasks = () =>
  pb.collection('pdca_tasks').getFullList({ expand: 'owner_id,project_id', sort: 'created' })
export const updateTask = (id: string, data: any) => pb.collection('pdca_tasks').update(id, data)
export const createTask = (data: any) => pb.collection('pdca_tasks').create(data)

export const getActivities = () =>
  pb.collection('activities').getFullList({ expand: 'user_id', sort: '-created', limit: 10 })
