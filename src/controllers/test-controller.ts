import { Body, Controller, Delete, Get, Param, Post, Query } from "@lib/common";

@Controller("test")
export class TestController {
  @Get("/path")
  async execute() {
    return { message: "PATH DE TEST" };
  }

  @Get("/path/test")
  async executetest(@Query() query: any) {
    console.log("query", query);
    return "QUERY TEST";
  }

  @Get("/path/test/:id")
  async executetestparam(@Param() data: any) {
    console.log("id", data);
    return "QUERY TEST";
  }

  @Post("/post")
  async executepost(@Body() input: any) {
    console.log("input", input);
    return "BODY TEST";
  }

  @Delete("/delete/path")
  async remove() {
    return "PATH DE DELETE";
  }
}
