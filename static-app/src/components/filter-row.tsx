import {
  Box,
  Button,
  HStack,
  Menu,
  Portal,
  Tag,
  useCheckboxGroup,
  VStack,
} from "@chakra-ui/react";
import { FilterType } from "models/enum";
import { useState } from "react";
import { HiCog } from "react-icons/hi";
import { LuFilter } from "react-icons/lu";

export type Filter = {
  name: string;
  value: string;
  color: string;
  isSelected: boolean;
  type: FilterType;
};
export type FilterRowProps = {
  filters: Filter[];
  defaultValue: string[];
  action: (filter: Filter, isSelected: boolean) => void;
};
export default function FilterRow({
  defaultValue,
  filters,
  action,
}: FilterRowProps) {
  const group = useCheckboxGroup({ defaultValue });
  //   function toggleFilter(filter: Filter) {
  //     setFilters((prev) =>
  //       prev.map((item) => {
  //         return item === filter
  //           ? { ...item, isSelected: !item.isSelected }
  //           : item;
  //       })
  //     );
  //   }
  function toggleFilter(filter: Filter) {
    const isSelected = group.isChecked(filter.value);
    group.toggleValue(filter.value);
    action(filter, !isSelected);
  }
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="surface" size="sm">
          <LuFilter /> Filters
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.ItemGroup>
              <Menu.ItemGroupLabel>Task Types</Menu.ItemGroupLabel>
              {filters.map((filter) => (
                <Menu.CheckboxItem
                  key={filter.value}
                  value={filter.value}
                  checked={group.isChecked(filter.value)}
                  onCheckedChange={() => toggleFilter(filter)}
                >
                  {filter.name}
                  <Menu.ItemIndicator />
                </Menu.CheckboxItem>
              ))}
            </Menu.ItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
