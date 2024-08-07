import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import { UpdateTaskDTO } from '../dto/UpdateTask';
import { Tarefas } from '../lib/interface';

@Injectable()
export class TaskService {
    constructor(private readonly prismaService: PrismaService) { }

    async create(task: Tarefas) {
        if (task.perecivel && !task.dataValidade) {
            throw new BadRequestException('Data de validade é obrigatória para produtos perecíveis');
        }

        return await this.prismaService.tarefa.create({
            data: {
                nome: task.nome,
                text: task.text,
                perecivel: task.perecivel,
                dataValidade: task.dataValidade ? new Date(task.dataValidade) : null,
                dataFabricacao: task.dataFabricacao ? new Date(task.dataFabricacao) : null,
                pastaId: task.pastaId,
                usuarioId: task.usuarioId
            },
        });
    }

    async getAll(userId: string) {
        if (!userId) {
            throw new BadRequestException("Erro ao buscar id: Id não existe!");
        }

        const getAllId = await this.prismaService.tarefa.findMany({
            where: { usuarioId: userId },
            include: { pasta: true }
        })

        return getAllId
    }

    async getById(id: string) {
        if (!id) {
            throw new BadRequestException("Erro ao buscar id: Id não existe!");
        }

        const getById = await this.prismaService.tarefa.findFirst({
            where: {
                id
            }
        })

        return getById
    }

    async update(id: string, task: UpdateTaskDTO) {
        if (task.perecivel && !task.dataValidade) {
            throw new BadRequestException('Data de validade é obrigatória para produtos perecíveis');
        }

        return await this.prismaService.tarefa.update({
            where: { id },
            data: {
                nome: task.nome,
                text: task.text,
                perecivel: task.perecivel,
                dataValidade: task.dataValidade,
                dataFabricacao: task.dataFabricacao,
            },
        });
    }


    async delete(id: string) {
        if (!id) {
            throw new BadRequestException("Erro ao buscar id: Id não existe!");
        }

        return await this.prismaService.tarefa.delete({
            where: { id }
        })
    }

}
