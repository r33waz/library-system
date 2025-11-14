"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  BookOpen,
  Building2,
  ChevronRight,
  Home,
  Settings,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type Crumb = {
  label: string;
  href?: string;
  icon?: string;
};

const iconMap = {
  home: Home,
  building: Building2,
  users: Users,
  settings: Settings,
  books: BookOpen,
};

export default function ProfessionalBreadcrumb({ items }: { items: Crumb[] }) {
  const naviagte = useNavigate();

  const getIcon = (iconName?: string) => {
    if (!iconName) return null;
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return IconComponent ? <IconComponent className="w-4 h-4" /> : null;
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      naviagte(-1);
    } else {
      naviagte("/e-book/home");
    }
  };

  return (
    <div className="flex w-full justify-between items-center mb-8     ">
      <Breadcrumb>
        <BreadcrumbList className="flex items-center space-x-1">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isFirst = index === 0;

            return (
              <div key={index} className="flex items-center">
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-dark-secondary rounded-lg shadow-sm border  ">
                      {getIcon(item.icon)}
                      <span className="text-sm font-medium text-green-primary group-hover:text-green-secondary">{item.label}</span>
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink
                      href={item.href}
                      className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-dark-secondary  rounded-lg shadow-sm border  transition-all duration-200 hover:shadow-md hover:scale-105 group"
                    >
                      {isFirst ? (
                        <Home className="w-4 h-4 text-green-primary group-hover:text-green-secondary" />
                      ) : (
                        getIcon(item.icon) && (
                          <span className="text-green-primary group-hover:text-green-secondary">
                            {getIcon(item.icon)}
                          </span>
                        )
                      )}
                      <span className="text-sm font-medium text-green-primary group-hover:text-green-secondary">
                        {item.label}
                      </span>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && (
                  <BreadcrumbSeparator className="mx-2">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </BreadcrumbSeparator>
                )}
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          size="sm"
          onClick={handleBack}
          className="text-sm font-medium text-green-primary hover:text-green-secondary bg-white dark:bg-dark-secondary"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium hidden sm:inline">Back</span>
        </Button>
      </div>
    </div>
  );
}
