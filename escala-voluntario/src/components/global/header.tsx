import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup, // 1. Adicionado na importação
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, LogOut, User } from "lucide-react";

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo ou Título */}
        <div className="font-bold text-lg text-blue-600">Escala Voluntário</div>

        {/* Ícone de Perfil e Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger
            className={buttonVariants({
              variant: "ghost",
              className: "relative h-10 w-10 rounded-full p-0",
            })}
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src="/avatar-placeholder.png" alt="Seu Perfil" />
              <AvatarFallback>DM</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56" align="end">
            {/* 2. Envolvendo o Label e os itens com DropdownMenuGroup */}
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Douglas</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    douglas@escala.com
                  </p>
                  <p className="text-xs font-bold text-blue-600 mt-1">
                    Super Admin Global
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Editar Perfil (Foto/Email)</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Alterar Senha</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}