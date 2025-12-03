#include <iostream>
#include <string>
#include <sstream>
#include <map>
#include <nlohmann/json.hpp>
using json = nlohmann::json;

int solution(const std::map<std::string, int>& input); // To be implemented by user code

int main() {
    // Read JSON from stdin
    std::string inputLine, allInput;
    while (std::getline(std::cin, inputLine))
        allInput += inputLine;

    // Parse input
    json j;
    try {
        j = json::parse(allInput);
    } catch (...) {
        std::cout << "{\"error\": \"JSON parse error\"}" << std::endl;
        return 0;
    }

    std::map<std::string, int> inMap;
    if(j.contains("input")) {
        auto inj = j["input"];
        for(json::iterator it = inj.begin(); it != inj.end(); ++it) {
            inMap[it.key()] = it.value();
        }
    }

    try {
        int output = solution(inMap);
        std::cout << "{\"output\": " << output << "}" << std::endl;
    } catch (std::exception& e) {
        std::cout << "{\"error\": \"" << e.what() << "\"}" << std::endl;
    }
    return 0;
}