'use client'

import useActionTable from '@/hooks/tables/useActionTable'
import { IProject } from '@/constants/project'
import { projectDefaultValueForm } from '@/constants/project'
import ContentContainer from '@/components/elements/content-container'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { projectTableColumns } from './columns'
import ProjectForm from './project-form'

export default function ProjectTable({ projects }: { projects: IProject[] }) {
  const { handleClickAdd } = useActionTable<IProject>({
    defaultValue: projectDefaultValueForm,
    dialogContent: () => <ProjectForm />
  })
  return (
    <ContentContainer>
      <div className="flex items-baseline justify-between">
        <h2 className="mb-6 text-2xl font-bold">My Projects</h2>
        <Button variant="outline" onClick={handleClickAdd}>
          New Project
        </Button>
      </div>
      <DataTable columns={projectTableColumns} data={projects} />
    </ContentContainer>
  )
}
