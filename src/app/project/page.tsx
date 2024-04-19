import { getProjects } from '@/data-access/projects/get-projects.persistence'
import ProjectTable from '@/components/module/project/project-table'

export default async function ProjectPage() {
  const projects = await getProjects()
  return (
    <div className="flex w-full justify-center">
      <ProjectTable projects={projects} />
    </div>
  )
}
