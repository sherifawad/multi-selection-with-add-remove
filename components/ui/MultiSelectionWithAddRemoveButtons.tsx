"use client";

import React from "react";
import { ChevronDown, LoaderIcon, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Highlighter from "react-highlight-words";

const tabTitles = ["add", "remove"] as const;
type tabTitleType = (typeof tabTitles)[number];

type MultiSelectionWithAddRemoveButtonsProps = {
	value?: string[];
	options: {
		label: string;
		value: string;
	}[];
	onValueSelected: (selection?: string[]) => void;
	isLoading?: boolean;
};

export function MultiSelectionWithAddRemoveButtons({
	onValueSelected,
	value,
	options,
	isLoading,
}: MultiSelectionWithAddRemoveButtonsProps) {
	const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
	const [activeTab, setActiveTab] = React.useState<tabTitleType>("add");

	const ids = React.useMemo(() => new Set(value?.filter(Boolean) || []), [value]);

	const data = React.useMemo(() => {
		if (!options) return { add: [], remove: [] };
		const add = options.filter((item) => !ids.has(item.value));
		const remove = options.filter((item) => ids.has(item.value));
		return { add, remove };
	}, [ids, options]);

	const handleClosePopover = React.useCallback(() => setIsPopoverOpen(false), []);
	const handleTogglePopover = React.useCallback(() => setIsPopoverOpen((prev) => !prev), []);

	const handleSelect = React.useCallback(
		(item: MultiSelectionWithAddRemoveButtonsProps["options"][number]) => {
			const newList = activeTab === "add" ? [...data.remove, item] : data.remove.filter((d) => d.value !== item.value);
			onValueSelected(newList.map((d) => d.value));
		},
		[activeTab, data, onValueSelected]
	);

	const handleSelectAll = React.useCallback(() => {
		onValueSelected(activeTab === "add" ? options?.map((d) => d.value) : []);
	}, [activeTab, onValueSelected, options]);

	const handleUnselect = React.useCallback(
		(item: MultiSelectionWithAddRemoveButtonsProps["options"][number]) => {
			const newList = data.remove.filter((d) => d.value !== item.value);
			onValueSelected(newList.map((d) => d.value));
		},
		[data.remove, onValueSelected]
	);

	return (
		<Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
			<SelectedProperty
				isLoading={isLoading}
				selected={data.remove}
				handleUnselect={handleUnselect}
				handleTogglePopover={handleTogglePopover}
			/>
			<PopoverContent className="min-w-[var(--radix-popper-anchor-width)] p-0 max-h-[300px] overflow-hidden">
				<PropertiesList
					onClose={handleClosePopover}
					selectAll={handleSelectAll}
					onSelect={handleSelect}
					list={data}
					onTabValueChange={async (tab) => setActiveTab(tab as tabTitleType)}
					selectedTab={activeTab}
				/>
			</PopoverContent>
		</Popover>
	);
}

type SelectedPropertyProps = React.ComponentProps<"button"> & {
	selected?: MultiSelectionWithAddRemoveButtonsProps["options"];
	isLoading?: boolean;
	handleTogglePopover?: () => void;
	handleUnselect?: (item: MultiSelectionWithAddRemoveButtonsProps["options"][number]) => void;
};

function SelectedProperty({
	selected = [],
	isLoading,
	handleTogglePopover,
	handleUnselect,
	className,
	...props
}: SelectedPropertyProps) {
	return (
		<TooltipProvider>
			<PopoverTrigger asChild>
				<Button
					onClick={handleTogglePopover}
					disabled={isLoading}
					className={cn(
						"flex h-auto min-h-10 w-full items-center justify-between rounded-md border bg-input p-1 hover:bg-input/80",
						className
					)}
					{...props}
				>
					{selected.length > 0 ? (
						<Tooltip delayDuration={100}>
							<ScrollArea className="w-full">
								<TooltipTrigger asChild>
									<div className="flex w-max gap-1">
										{selected.map((item) => (
											<Badge
												key={item.value}
												variant="default"
												className="flex-shrink rounded-sm text-[13.6px] font-medium capitalize hover:bg-primary"
											>
												{item.label}
												<span
													className="ml-1 rounded-full outline-none ring-offset-background active:ring-2 active:ring-ring active:ring-offset-2 cursor-pointer"
													onClick={(e) => {
														e.preventDefault();
														e.stopPropagation();
														handleUnselect?.(item);
													}}
												>
													<X className="h-3 w-3 text-destructive hover:text-destructive/50" />
												</span>
											</Badge>
										))}
									</div>
								</TooltipTrigger>
								<ScrollBar orientation="horizontal" className="opacity-40" onClick={(e) => e.stopPropagation()} />
							</ScrollArea>
						</Tooltip>
					) : (
						<>
							{isLoading ? (
								<div className="ml-2 mt-1 flex h-6 flex-1 items-center bg-transparent text-muted-foreground outline-none">
									<LoaderIcon className="animate-spin" />
								</div>
							) : (
								<div className="mx-auto flex w-full items-center justify-between">
									<span className="mx-3 text-sm capitalize text-muted-foreground">select</span>
									<ChevronDown className="mx-2 h-4 cursor-pointer text-muted-foreground" />
								</div>
							)}
						</>
					)}
				</Button>
			</PopoverTrigger>
		</TooltipProvider>
	);
}

type PropertiesListProps = {
	list: Record<tabTitleType, MultiSelectionWithAddRemoveButtonsProps["options"][number][]>;
	onTabValueChange: (value: tabTitleType) => Promise<void>;
	selectedTab: tabTitleType;
	selectAll: () => void;
	onClose: () => void;
	onSelect?: (value: MultiSelectionWithAddRemoveButtonsProps["options"][number]) => void;
};

function PropertiesList({ list, onTabValueChange, selectedTab, ...props }: PropertiesListProps) {
	return (
		<Tabs
			value={selectedTab}
			onValueChange={(value) => onTabValueChange(value as tabTitleType)}
			className="w-full flex flex-col h-full"
		>
			<TabsList className="w-full rounded-b-none sticky top-0 z-10 bg-background">
				{tabTitles.map((title) => (
					<TabsTrigger key={title} className="w-full capitalize" value={title}>
						{title}
					</TabsTrigger>
				))}
			</TabsList>
			<div className="flex-grow overflow-auto">
				{tabTitles.map((title) => (
					<TabsContent key={title} value={title} className="h-full m-0">
						<PropertyCommand items={list[title]} selectedTab={selectedTab} {...props} />
					</TabsContent>
				))}
			</div>
		</Tabs>
	);
}

type PropertyCommandProps = {
	items: MultiSelectionWithAddRemoveButtonsProps["options"][number][];
	onSelect?: (value: MultiSelectionWithAddRemoveButtonsProps["options"][number]) => void;
	selectedTab: tabTitleType;
	selectAll?: () => void;
	onClose?: () => void;
};

function PropertyCommand({ items, onSelect, onClose, selectAll, selectedTab }: PropertyCommandProps) {
	const [searchValue, setSearchValue] = React.useState("");

	const searchResults =
		searchValue.length > 0 ? items.filter((item) => item.label.toLowerCase().includes(searchValue.toLowerCase())) : [];

	const isEmpty =
		(searchValue.length > 0 && searchResults.length === 0) || (searchValue.length === 0 && items.length === 0);

	const getItemList = (item: MultiSelectionWithAddRemoveButtonsProps["options"][number]) => (
		<CommandItem className="cursor-pointer" key={item.value} onSelect={() => onSelect?.(item)}>
			<Highlighter
				highlightClassName="rounded-md bg-amber-300/70 px-1 py-0.5 text-foreground"
				searchWords={searchValue.trim().split(" ")}
				autoEscape
				textToHighlight={item.label}
			/>
		</CommandItem>
	);

	return (
		<Command
			className="overflow-hidden flex flex-col"
			filter={(value, _) => {
				if (value.toLowerCase().includes(searchValue.toLowerCase())) return 1;
				return 0;
			}}
		>
			<CommandInput
				value={searchValue}
				onValueChange={setSearchValue}
				className="placeholder:Capitalize h-10 border-0 sticky top-0 z-10 bg-background"
				placeholder="Search..."
			/>
			<CommandList className="overflow-auto">
				<div className={cn("py-6 capitalize text-center hidden", isEmpty && "block")}>empty</div>
				<CommandGroup>{items?.map(getItemList)}</CommandGroup>
			</CommandList>
			<div className="border-t p-2 bg-background sticky bottom-0 z-10">
				<div className="flex  gap-2">
					<Badge className="max-w-max">
						{searchValue.length > 0 ? `${searchResults.length} of ${items.length}` : items.length}
					</Badge>
					<div className={cn("flex flex-1 gap-2", (searchValue.length > 0 || items.length < 1) && "hidden")}>
						<span
							onClick={selectAll}
							className="relative flex justify-center gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer flex-1 text-center capitalize hover:bg-muted"
						>
							{selectedTab === "remove" ? "remove all" : "add all"}
						</span>
						<Separator orientation="vertical" className="h-full " />
					</div>
					<span
						onClick={onClose}
						className=" relative flex justify-center gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer flex-1 text-center capitalize hover:bg-muted"
					>
						close
					</span>
				</div>
			</div>
		</Command>
	);
}
