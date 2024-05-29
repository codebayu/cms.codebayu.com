import { ProjectUseCase } from '@/usecase/project'
import ProjectTable from './component/project-table'

export default async function ProjectPage({ searchParams }: { searchParams?: { page?: string } }) {
  const page = Number(searchParams?.page) || 1
  const usecase = new ProjectUseCase()
  const projects = await usecase.getAllProject({ page })
  return (
    <div className="flex w-full justify-center">
      <ProjectTable projects={projects} />
    </div>
  )
}
