"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "../../../components/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { Button } from "../../../components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../../components/ui/command";
import { useEffect, useLayoutEffect, useState } from "react";
import { TicketCategory } from "../../../lib/types/tickets/ticket-category";
import { TicketType } from "../../../lib/types/tickets/ticket-type";
import ticketsService from "../../../services/tickets-service";
import { Textarea } from "../../../components/ui/textarea";
import { CreateTicketInput } from "../../../lib/types/tickets/create-ticket-input";

const CreateTicketPage = () => {
  const router = useRouter();
  const initLongitude = useSearchParams().get("longitude");
  const initLatitude = useSearchParams().get("latitude");
  const address = useSearchParams().get("address");
  const [categories, setCategories] = useState<TicketCategory[]>([]);
  const [baseFormData, setBaseFormData] = useState({
    title: "",
    address: address ?? "",
    description: "",
    latitude: initLatitude ?? "",
    longitude: initLongitude ?? "",
  });
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentType, setCurrentType] = useState("");
  const [types, setTypes] = useState<TicketType[]>([]);

  const fetchCategories = async () => {
    setCategories((await ticketsService.getCategories()).results);
  };

  const fetchTypes = async (categoryId: number) => {
    setTypes((await ticketsService.getCategory(categoryId)).types);
  };

  useLayoutEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (currentCategory !== "") {
      fetchTypes(
        categories.find((category) => category.title === currentCategory)!.id
      );
    }
  }, [currentCategory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: CreateTicketInput = {
      ...baseFormData,
      latitude: Number(baseFormData.latitude),
      longitude: Number(baseFormData.longitude),
      typeId: types.find((type) => type.title === currentType)!.id,
    };
    const newTicket = await ticketsService.createTicket(data);
    router.push(`/requests/${newTicket.id}`);
  };

  return (
    <>
      <div className="border-b mb-4">
        <button
          onClick={() => router.back()}
          className="m-4 text-xl font-bold flex items-center cursor-pointer"
        >
          <ChevronLeft className="text-xl font-bold" />
          <h1>Заявка</h1>
        </button>
      </div>
      <form onSubmit={handleSubmit} className="px-4 space-y-3">
        <div>
          <label className="text-sm">Заголовок</label>
          <Input
            required
            placeholder="Яма на улице Кулаковского"
            value={baseFormData.title}
            onChange={(e) =>
              setBaseFormData({ ...baseFormData, title: e.target.value })
            }
          />
        </div>
        <div>
          <label className="text-sm">Улица</label>
          <Input
            required
            placeholder="улице Кулаковского"
            value={baseFormData.address}
            readOnly={true}
            onChange={(e) =>
              setBaseFormData({ ...baseFormData, address: e.target.value })
            }
          />
        </div>
        <div>
          <label className="text-sm">Подробности</label>
          <Textarea
            required
            value={baseFormData.description}
            onChange={(e) =>
              setBaseFormData({ ...baseFormData, description: e.target.value })
            }
          />
        </div>
        <div>
          <label className="text-sm">Широта</label>
          <Input
            required
            type="number"
            step="0.0001"
            min={-180}
            max={180}
            placeholder="129.705278"
            value={baseFormData.longitude}
            onChange={(e) =>
              setBaseFormData({ ...baseFormData, longitude: e.target.value })
            }
          />
        </div>
        <div>
          <label className="text-sm">Высота</label>
          <Input
            required
            type="number"
            step="0.000001"
            min={-90}
            max={90}
            placeholder="62.016720"
            value={baseFormData.latitude}
            onChange={(e) =>
              setBaseFormData({ ...baseFormData, latitude: e.target.value })
            }
          />
        </div>

        <label className="text-sm">Категория</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"outline"} className="w-full justify-start">
              {currentCategory !== "" ? currentCategory : "Выберите категорию"}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Command>
              <CommandInput placeholder="Найдите категорию" />
              <CommandList>
                <CommandEmpty>Не найдено</CommandEmpty>
                <CommandGroup>
                  {categories.map((category) => (
                    <CommandItem
                      key={category.id}
                      value={category.title}
                      onSelect={(currentValue) => {
                        setCurrentCategory(
                          currentValue === currentCategory ? "" : currentValue
                        );
                      }}
                    >
                      {category.title}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <label className="text-sm">Тип</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              disabled={currentCategory === ""}
              variant={"outline"}
              className="w-full justify-start"
            >
              {currentType !== "" ? currentType : "Выберите тип"}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Command>
              <CommandInput placeholder="Найдите тип" />
              <CommandList>
                <CommandEmpty>Не найдено</CommandEmpty>
                <CommandGroup>
                  {types.map((type) => (
                    <CommandItem
                      key={type.id}
                      value={type.title}
                      onSelect={(currentValue) => {
                        setCurrentType(
                          currentValue === currentType ? "" : currentValue
                        );
                      }}
                    >
                      {type.title}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Button className="w-full mt-5">Создать</Button>
      </form>
    </>
  );
};

export default CreateTicketPage;
