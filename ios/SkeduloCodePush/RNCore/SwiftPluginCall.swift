//
//  SwiftPluginCall.swift
//  SkeduloCodePush
//
//  Created by Huy Vu on 12/01/2022.
//

import Foundation
import UIKit

@objc
class SwiftPluginCall: NSObject {
    
    public static var sharedController: UIViewController? = nil
    public static var nativeCountData: Int = 0
    
    @objc
    static func exit() {
        if sharedController == nil {
            return
        }
        
        DispatchQueue.main.sync {
            sharedController?.dismiss(animated: true, completion: nil)
        }
    }
    
    @objc
    static func increaseNativeCount() {
        
        nativeCountData+=1;
        
        ViewController.shared?.updateCount()
    }
    
}
