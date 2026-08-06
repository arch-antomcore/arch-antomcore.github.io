import React from 'react';
import { cn } from '@/lib/utils';

function Card({ className, ...props }) {
	return (
		<div
			className={cn(
				'bg-zinc-950/80 relative w-full rounded-3xl backdrop-blur-2xl',
				'p-2.5 shadow-2xl border border-white/[0.08] hover:border-white/15 transition-colors duration-300',
				className,
			)}
			{...props}
		/>
	);
}

function Header({
	className,
	children,
	glassEffect = true,
	...props
}) {
	return (
		<div
			className={cn(
				'bg-zinc-900/30 relative rounded-2xl border border-white/[0.04] p-5 shadow-inner',
				className,
			)}
			{...props}
		>
			{/* Top glass gradient */}
			{glassEffect && (
				<div
					aria-hidden="true"
					className="absolute inset-x-0 top-0 h-48 rounded-[inherit] pointer-events-none"
					style={{
						background:
							'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 40%, rgba(0,0,0,0) 100%)',
					}}
				/>
			)}
			{children}
		</div>
	);
}

function Plan({ className, ...props }) {
	return (
		<div
			className={cn('mb-3 flex items-center justify-between', className)}
			{...props}
		/>
	);
}

function Description({ className, ...props }) {
	return (
		<p className={cn('text-zinc-400 text-xs', className)} {...props} />
	);
}

function PlanName({ className, ...props }) {
	return (
		<div
			className={cn(
				"text-white flex items-center gap-2 text-sm font-medium [&_svg:not([class*='size-'])]:size-4",
				className,
			)}
			{...props}
		/>
	);
}

function Badge({ className, ...props }) {
	return (
		<span
			className={cn(
				'border-white/10 text-zinc-300 rounded-full border px-2.5 py-0.5 text-xs bg-white/[0.02]',
				className,
			)}
			{...props}
		/>
	);
}

function Price({ className, ...props }) {
	return (
		<div className={cn('mb-3 flex items-end gap-1', className)} {...props} />
	);
}

function MainPrice({ className, ...props }) {
	return (
		<span
			className={cn('text-3xl font-extrabold tracking-tight text-white', className)}
			{...props}
		/>
	);
}

function Period({ className, ...props }) {
	return (
		<span
			className={cn('text-zinc-400 pb-1 text-sm', className)}
			{...props}
		/>
	);
}

function OriginalPrice({ className, ...props }) {
	return (
		<span
			className={cn(
				'text-zinc-500 mr-1 ml-auto text-sm line-through font-light',
				className,
			)}
			{...props}
		/>
	);
}

function Body({ className, ...props }) {
	return <div className={cn('space-y-6 p-4', className)} {...props} />;
}

function List({ className, ...props }) {
	return <ul className={cn('space-y-3', className)} {...props} />;
}

function ListItem({ className, ...props }) {
	return (
		<li
			className={cn(
				'text-zinc-300 flex items-start gap-3 text-sm',
				className,
			)}
			{...props}
		/>
	);
}

function Separator({
	children = 'Upgrade to access',
	className,
	...props
}) {
	return (
		<div
			className={cn(
				'text-zinc-500 flex items-center gap-3 text-xs font-mono py-1',
				className,
			)}
			{...props}
		>
			<span className="bg-white/10 h-[1px] flex-1" />
			<span className="text-zinc-500 shrink-0">{children}</span>
			<span className="bg-white/10 h-[1px] flex-1" />
		</div>
	);
}

export {
	Card,
	Header,
	Description,
	Plan,
	PlanName,
	Badge,
	Price,
	MainPrice,
	Period,
	OriginalPrice,
	Body,
	List,
	ListItem,
	Separator,
};
